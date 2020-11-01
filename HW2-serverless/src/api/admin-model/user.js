import request from '@/utils/request'
import url from '../URL'
// 獲取所有User列表(包含已刪除的)
export function getAllUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Query/all',
    method: 'get',
    params: data
  })
}

// 獲取所有User列表(包含已刪除的is_delete = 0)
export function getUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Query/group',
    method: 'get',
    params: data
  })
}

// 獲取所有User列表(未刪除)
export function getSiteUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/SiteUser/Query/group',
    method: 'get',
    params: data
  })
}

// 獲取單一用戶信息(token,user_id)
export function getOneUserInfo(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Query/one',
    method: 'get',
    params: data
  })
}

// 獲取用戶登錄列表(token,user_id)
export function getLoginList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/LoginToken/user',
    method: 'get',
    params: data
  })
}
// 提交user form 新增有規則用戶
export function createUser(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/create',
    method: 'post',
    data
  })
}

// 提交user form 修改有規則用戶
export function modifyUser(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/update',
    method: 'put',
    data
  })
}

// 提交user form 新增無規則用戶
export function createUnlimitedUser(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/unlimited_create',
    method: 'post',
    data
  })
}

// 提交user form 修改無規則用戶
export function modifyUnlimitedUser(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/unlimited_update',
    method: 'put',
    data
  })
}

// 修改密碼(token,new password,user_id)
export function modifyPassword(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/update',
    method: 'put',
    data
  })
}
// 删除用户(token,user_id)
export function userDelete(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/delete',
    method: 'delete',
    data
  })
}

export function uploadUserAvatar(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/Modify/upload_avatar',
    method: 'post',
    data
  })
}

