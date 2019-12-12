import axios from 'axios'
import router from '@/router/routers'
import qs from 'qs'
import merge from 'lodash/merge'
import { getToken } from '@/utils/auth'
import { Notification, MessageBox } from 'element-ui'
import store from '../store'

const http = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
http.interceptors.response.use(
  response => {
    const code = response.status
    const codeFlag = (response.data && response.data.code === 401) || (code < 200 || code > 300)
    if (codeFlag) {
      Notification.error({
        title: '服务忙，请稍后再尝试'
      })
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    code = error.response.data.code
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else if (code === 500) {
      // MessageBox.error(error.response.data)
      Notification({
        title: '标题名称',
        message: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
      })
      return Promise.reject(error)
    } else {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 2500
        })
      }
    }
    return Promise.reject(error)
  }
)
/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  const address = process.env.BASE_API + actionName
  // console.log(address)
  return address
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
http.postForm = (url, data = {}) => {
  return http({
    method: 'POST',
    url: url,
    data: qs.stringify(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  })
}
export default http
