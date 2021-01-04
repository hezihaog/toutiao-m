/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
//非组件模块当中，获取store，必须通过这种方式
//这里的单独加载store，和在组件中 this.$store 是一个东西
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  //如果用户已登录，统一设置token到header中，未登录则不设置
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  //处理完之后一定要把config返回，否则请求就会停在这里
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器

//导出
export default request
