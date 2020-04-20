import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/css/base.css' // 地图的基本样式之一
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import BaiduMap from 'vue-baidu-map'
import VCharts from 'v-charts'
import echarts from 'echarts'

import App from './App'
import router from './router/routers'
import store from './store'
import axios from 'axios'
import qs from 'qs'

import './router/index' // permission control

import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import path from '@/utils/path'
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$path = path // 接口的所有路径
Vue.prototype.$axios = axios
Vue.prototype.qs = qs // 加载的方法

Vue.use(mavonEditor)
Vue.use(ElementUI, { locale })
Vue.use(BaiduMap, {
  ak: 'XkbZSGeguPkCDdSW2wD6LIRnzXrBVtLm'
})
Vue.use(echarts)

Vue.use(VCharts)
Vue.config.productionTip = false
require('babel-polyfill')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
