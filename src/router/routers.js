import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  { path: '/login', meta: { title: '登录', noCache: true }, component: () => import('@/views/login'), hidden: true },
  { path: '/', meta: { title: '首页', noCache: true }, component: () => import('@/views/index'), hidden: false },
  { path: '/base', meta: { title: '地图侧', noCache: true }, component: () => import('@/views/base'), hidden: false },
  { path: '/Demo', meta: { title: 'Demo', noCache: true }, component: () => import('@/views/Demo/Index.vue'), hidden: false }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
