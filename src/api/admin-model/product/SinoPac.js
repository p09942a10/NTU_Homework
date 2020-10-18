import request from '@/utils/request'
import url from '../../URL'
// 獲取永豐金GameRecord Table
export function getAllRecord() {
  return request({
    url: url.StampedeAPI + '/Events/SinoPac/querySinoPacRecordTable',
    method: 'get',
    params: { }
  })
}

export function getUserList() {
  return request({
    url: url.StampedeAPI + '/Events/SinoPac/querySinoPacUserTable',
    method: 'get',
    params: { }
  })
}

export function getGameList() {
  return request({
    url: url.StampedeAPI + '/Game/GameItem/querySinoPacGameItem',
    method: 'get',
    params: { }
  })
}

