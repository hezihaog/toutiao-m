/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
//非组件模块当中，获取store，必须通过这种方式
//这里的单独加载store，和在组件中 this.$store 是一个东西
import store from '@/store/'

/**
 * 登录/注册
 * @param data 数据对象，包含mobile手机号和code验证码，2个字段
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送短信验证码
 * @param mobile 手机号
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取登录用户的信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
