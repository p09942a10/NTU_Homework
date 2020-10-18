import request from '@/utils/request'
import url from './URL'

// 獲取天氣
export function getWeatherInfo() {
  return request({
    url: url.weather,
    method: 'get'
    // params: { Authorization: 'CWB-A6A12A10-26FC-4D39-B70B-AF5ADA665AEA', format: 'JSON' }
  })
}
