import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
//导入进度lib
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3,
})

/**
 * 固定路径
 */
const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/pageSetting/edit' },
  { path: '/index', redirect: '/pageSetting/edit' },
  {
    path: '/pageSetting',
    component: Layout,
    meta: { title: '页面配置' },
    children: [
      {
        path: 'edit',
        name: 'pageSettingEdit',
        component: () => import('@/views/pageSetting/pageIndex/edit.vue'),
        meta: { title: '页面编辑' },
      },
      {
        path: 'list',
        name: 'pageSettingList',
        component: () => import('@/views/pageSetting/pageIndex/list.vue'),
        meta: { title: '页面列表' },
      },
      {
        path: 'pageApi/list',
        name: 'pageApiList',
        component: () => import('@/views/pageSetting/pageApi/list.vue'),
        meta: { title: '接口列表' },
      },
      {
        path: 'pageApi/edit',
        name: 'pageApiEdit',
        component: () => import('@/views/pageSetting/pageApi/edit.vue'),
        meta: { title: '接口编辑', isShow: 1 },
      },
    ],
  },
]

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

router.afterEach(() => {
  NProgress.done()
})
export default router
