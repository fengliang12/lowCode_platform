import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', icon: 'house' },
    name: 'Home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/user',
    redirect: 'index',
    component: Layout,
    meta: { title: '用户管理', icon: 'UserFilled' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/views/User/index.vue'),
        meta: { title: '用户列表' },
      },
      {
        path: 'edit',
        name: 'UserEdit',
        component: () => import('@/views/User/edit.vue'),
        meta: { title: '用户编辑' },
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

export default router
