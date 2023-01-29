import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
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
  // 首页重定向
  { path: '/', redirect: '/index' },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
]

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

/**
 * 路由全局前置守卫
 */
router.beforeEach((to, from, next) => {
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
          next({ path: '/index' })
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
