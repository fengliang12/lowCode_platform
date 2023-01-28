import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
import { useUserStore } from '@/store/useUserStore'
import i18n from '@/i18n'
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
}) //progress配置

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: 'menus.wIndex', icon: 'house' },
    name: 'Home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: 'menus.wIndex',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: 'menus.wGoodsManger', icon: 'UserFilled' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/views/User/index.vue'),
        meta: { title: 'menus.wUserList' },
      },
      {
        path: 'edit',
        name: 'UserEdit',
        component: () => import('@/views/User/edit.vue'),
        meta: { title: 'menus.wUserEdit' },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: 'menus.wSystemManger', icon: 'UserFilled' },
    children: [
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => import('@/views/System/Menu.vue'),
        meta: { title: 'menus.wSystemMenu' },
      },
      {
        path: 'group',
        name: 'SystemGroup',
        component: () => import('@/views/System/Group.vue'),
        meta: { title: 'menus.wSystemRole' },
      },
    ],
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index.vue'),
    },
    ...routes,
  ], // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  console.log(router.getRoutes())
  const token = localStorage.getItem('token')
  const userStore = useUserStore()
  NProgress.start()
  if (!userStore.token && !token) {
    if (to.path.startsWith('/login')) {
      next()
    } else {
      next('/login')
    }
  } else if (!userStore.token && token) {
    userStore
      .loginByToken(token)
      .then(() => {
        if (to.path.startsWith('/login')) {
          next({ path: '/home' })
        } else {
          next()
        }
      })
      .catch(() => {
        next('/login')
      })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
