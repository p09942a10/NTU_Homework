import request from '@/utils/request'
import url from '../../URL'
// 獲取永豐金GameRecord Table
export function getGameItem() {
  return request({
    url: url.StampedeAPI + '/Game/GameItem/queryGameItem',
    method: 'get',
    params: { }
  })
}
