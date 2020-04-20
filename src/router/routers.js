import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/views/login'),
    hidden: true
  }, {
    path: '/',
    meta: { title: '首页', noCache: true },
    component: () => import('@/views/index'),
    hidden: false
  }, {
    path: '/base',
    meta: { title: '地图侧', noCache: true },
    component: () => import('@/views/base'),
    hidden: false
  }, {
    path: '/map',
    meta: { title: '地图测试', noCache: true },
    component: () => import('@/views/map'),
    hidden: false
  }, {
    path: '/dgMap',
    meta: { title: '东莞地图测试', noCache: true },
    component: () => import('@/views/dgMap'),
    hidden: false
  }, {
    path: '/testMap',
    meta: { title: 'echarts东莞地图测试', noCache: true },
    component: () => import('@/views/testMap'),
    hidden: false
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
