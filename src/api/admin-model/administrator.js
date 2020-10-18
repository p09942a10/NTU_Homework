import request from '@/utils/request'
import url from '../URL'
// 獲取系統管理員列表(token,object,user_id)
export function getAdminList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/UI/object/admin',
    method: 'get',
    params: data
  })
}
// 更新管理員列表(token,ids)
export function updateAdminList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/UI/update/admin',
    method: 'put',
    data
  })
}
