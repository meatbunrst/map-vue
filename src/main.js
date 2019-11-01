import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { isAuth } from '@/utils'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router/routers'
import permission from './components/permission'
import store from './store'
import axios from 'axios'
import qs from 'qs'

import '@/icons' // icon
import './router/index' // permission control

import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$axios = axios
Vue.prototype.isAuth = isAuth // 权限方法
Vue.prototype.qs = qs // 加载的方法

Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
require('babel-polyfill')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
