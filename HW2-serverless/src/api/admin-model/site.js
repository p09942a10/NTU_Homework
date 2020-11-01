import request from '@/utils/request'
import url from '../URL'
// 獲取Site列表(token,company_id)
export function getAllSiteList(data) {
  return request({
    url: url.MPD_CloudAPI + '/Site/Query/all',
    method: 'get',
    params: data
  })
}

export function getSiteList(data) {
  return request({
    url: url.MPD_CloudAPI + '/Site/Query/list',
    method: 'get',
    params: data
  })
}

// 獲取單一Site信息(token,site_id)
export function getOneSiteInfo(data) {
  return request({
    url: url.MPD_CloudAPI + '/Site/Query/one',
    method: 'get',
    params: data
  })
}
// 提交Site修改/創建表單
export function createSite(data) {
  return request({
    url: url.MPD_CloudAPI + '/Site/Modify/create',
    method: 'post',
    data
  })
}

// 提交Site修改/創建表單
export function modifySite(data) {
  return request({
    url: url.MPD_CloudAPI + '/Site/Modify/update',
    method: 'put',
    data
  })
}

// 獲取分部管理員(token,site_id)
export function getSiteAdminUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/UI/object/site',
    method: 'get',
    params: data
  })
}

// 更新分部管理員(token,site_id,user_ids)
export function updateSiteAdminUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/UI/update/site',
    method: 'put',
    data
  })
}

// 獲取分部管理員(token,site_id)
export function getSiteUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/SiteUser/Query/member',
    method: 'get',
    params: data
  })
}

// 更新分部管理員(token,site_id,user_ids)
export function updateSiteUserList(data) {
  return request({
    url: url.MPD_CloudAPI + '/SiteUser/Modify/update',
    method: 'put',
    data
  })
}
