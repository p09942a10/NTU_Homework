const userUIList = [{
  is_ui_admin: true,
  user_id: '30',
  name: '帳號測試員',
  email: 'btestman001@gmail.com ',
  gender: 'male',
  birthday: '1551628800',
  phone: '222111',
  description: ''
}, {
  is_ui_admin: true,
  user_id: '23',
  name: 'Shaun',
  email: 'Shaun@gmail.com',
  gender: 'male',
  birthday: '455126400',
  phone: '093599899',
  description: ''
}, {
  is_ui_admin: false,
  user_id: '29',
  name: 'Shirley Shih',
  email: 'Saikow0604@gmail.com',
  gender: 'female',
  birthday: '455126400',
  phone: '0932285259',
  description: ''
}, {
  is_ui_admin: false,
  user_id: '24',
  name: 'Aderson',
  email: 'Aderson@gmail.com',
  gender: 'male',
  birthday: '455126400',
  phone: '0956564888',
  description: ''
}, {
  is_ui_admin: true,
  user_id: '21',
  name: 'Kevin',
  email: 'Kevin@gmail.com',
  gender: 'male',
  birthday: '455126400',
  phone: '0965877666',
  description: ''
}]

export default [
  // user login
  {
    url: '/UI/UISystem/UserUIList/admin',
    type: 'get',
    response: config => {
      const { token } = config.query
      // mock error
      if (!token) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      return {
        status: 200,
        message: 'get data success',
        result: userUIList
      }
    }
  },
  {
    url: '/User/UI/update/admin',
    type: 'post',
    response: config => {
      const { token, user_ids } = config.body
      // mock error
      if (!token || !user_ids) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      return {
        status: 200,
        message: 'get data success'
      }
    }
  }
]

