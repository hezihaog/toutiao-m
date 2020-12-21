/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

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
