import request from '@/utils/request'
import url from './URL'
// 登錄，獲取token(account,pwd)
export function login(data) {
  return request({
    url: url.login,
    method: 'post',
    data
  })
}

// 獲取用戶信息（token）
export function getInfo(token) {
  return request({
    url: url.MPD_CloudAPI + '/User/LoginUI/userinfo',
    method: 'get',
    params: { token }
  })
}

