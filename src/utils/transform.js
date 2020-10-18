// 表格時間戳換算為時間
export function tableTimeStampToTime(value, row, column) {
  const date = String(row[value]).length === 13 ? new Date(parseInt(row[value])) : new Date(parseInt(row[value]) * 1000)
  const Y = date.getFullYear() + '-'
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  if (value === 'birthday') {
    return Y + M + D
  } else {
    return Y + M + D + h + m + s
  }
}

// 一般時間戳換算為時間
export function timestampToTime(timestamp, value) {
  const date = String(timestamp).length === 13 ? new Date(parseInt(timestamp)) : new Date(parseInt(timestamp) * 1000)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  if (value === 'birthday') {
    return Y + M + D
  } else {
    return Y + M + D + h + m + s
  }
}

// bool值1/0轉換為yes/no
export function boolTransform(value) {
  if (value) {
    return 'true'
  } else {
    return 'false'
  }
}

// 毫秒轉秒
export function msToS(value, row, column) {
  const second = Math.round(row[value] / 1000)
  return second
}
