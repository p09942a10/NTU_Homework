import request from '@/utils/request'
import url from '../URL'
// 獲取公司列表（token）
export function getCompanyList(token) {
  return request({
    url: url.MPD_CloudAPI + '/Company/Query/all',
    method: 'get',
    params: { token }
  })
}
// 獲取單一公司信息（token，company_id）
export function getOneCompanyInfo(data) {
  return request({
    url: url.MPD_CloudAPI + '/Company/Query/one',
    method: 'get',
    params: data
  })
}

// 新增公司信息(token,info)
export function createCompany(data) {
  return request({
    url: url.MPD_CloudAPI + '/Company/Modify/create',
    method: 'post',
    data
  })
}

// 修改公司信息(token,info)
export function modifyCompany(data) {
  return request({
    url: url.MPD_CloudAPI + '/Company/Modify/update',
    method: 'put',
    data
  })
}

// 獲取公司管理員(token,company_id)
export function getCompanyManagerList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/UI/object/company',
    method: 'get',
    params: data
  })
}

// 更新公司管理員(token,company_id,user_ids)
export function updateCompanyManagerList(data) {
  return request({
    url: url.MPD_CloudAPI + '/User/UI/update/company',
    method: 'put',
    data
  })
}
