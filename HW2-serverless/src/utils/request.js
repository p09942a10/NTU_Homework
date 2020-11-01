import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/',
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
  time: 8000
})
// 全局loading動畫開啟關閉

let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

// request interceptor
service.interceptors.request.use(
  config => {
    startLoading()
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['MPD-Token'] is a custom headers key
      // please modify it according to the actual situation.
      config.headers['MPD-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    endLoading()
    // if the custom code is not 200, it is judged as an error.
    if (res.success === 'true') {
      Message({
        message: res.message || 'Success',
        type: 'success',
        duration: 1 * 1000
      })
    } else {
      if (res.status !== '200') {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.status === '401') {
          // to re-login
          MessageBox.confirm('Access token invalid, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            // cancelButtonText: 'Cancel',
            showClose: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        Message({
          message: res.message || 'Success',
          type: 'success',
          duration: 1 * 1000
        })
        return res
      }
    }
    return res
  },
  error => {
    endLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
