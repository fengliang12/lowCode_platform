import { selectUserMenu } from '@/api/System/Menu'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'
import router from '@/router'
const modules = import.meta.glob('../views/**/*.vue')

export const useMenuStore = defineStore('menuStore', {
  state: () => {
    return {
      menuList: [
        {
          path: '/pageSetting/edit',
          name: 'pageSettingEdit',
          meta: { title: '页面编辑', isShow: 0 },
        },
        {
          path: '/pageSetting/list',
          name: 'pageSettingList',
          meta: { title: '页面列表', isShow: 0 },
        },
        {
          path: '/pageSetting/pageApi/list',
          name: 'pageApiList',
          meta: { title: '接口列表', isShow: 0 },
        },
        {
          path: '/pageSetting/pageApi/edit',
          name: 'pageApiEdit',
          meta: { title: '接口编辑', isShow: 1 },
        },
      ],
    }
  },
  getters: {},
  actions: {
    // 根据角色获取菜单权限
    async generateSystemMenus(roleId: number) {
      let routers: RouteRecordRaw[] = []
      const res = await selectUserMenu(roleId)
      const list = res.data.data
      routers = initMenu(list)
      routers.forEach((route) => {
        //特殊处理只有一个子元素并且redirect为null的路径
        if (route.redirect == null && route.children?.length == 1) {
          route.redirect = route.path + '/' + route.children[0].path
          route.meta = route.children[0].meta
        }
        router.addRoute(route)
      })
      this.menuList = routers
      router.replace(router.currentRoute.value.fullPath)
    },
  },
})

const initMenu = (list: any) => {
  list.forEach((el: any) => {
    if (el.component === 'Layout') {
      el.component = Layout
    } else {
      el.component = modules[`../views/${el.component}.vue`]
    }
    if (el?.children && el.children.length) {
      initMenu(el.children)
    }
  })
  return list
}
