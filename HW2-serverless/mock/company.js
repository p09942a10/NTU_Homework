const companyList = [{
  'company_id': '1',
  'title': 'Compal',
  'phone': '(0)2-8797-8588',
  'description': 'Compal',
  'site_count': 1,
  'address': '台北市內湖區瑞光路581及581之1號',
  'is_delete': false
}, {
  'company_id': '2',
  'title': '丸鐵',
  'phone': '(0)7-552-7159',
  'is_deleted': '0',
  'description': '',
  'site_count': 1,
  'address': '高雄市鼓山區美術館路123號',
  'is_delete': false
}, {
  'company_id': '3',
  'title': '文化大學',
  'phone': '(0)2-2861-1801',
  'is_deleted': '0',
  'description': '',
  'site_count': 4,
  'address': '臺北市11114陽明山華岡路55號',
  'is_delete': false
}, {
  'company_id': '4',
  'title': '北市大',
  'phone': '(0)2-2871-8288',
  'is_deleted': '0',
  'descriptiSon': '',
  'site_count': 2,
  'address': '臺北市士林區忠誠路二段101號',
  'is_delete': false
}, {
  'company_id': '4',
  'title': '永豐金',
  'phone': '0800-038-123',
  'is_deleted': '',
  'descriptiSon': '',
  'site_count': 1,
  'address': '台北市重慶南路一段二號',
  'is_delete': false
}]

const fakeResponse = {
  'company_id': '1',
  'title': 'example',
  'phone': '0287978599',
  'is_deleted': '0',
  'description': 'just an example',
  'site_count': 1,
  'is_delete': false
}
const companyManager = [{
  'is_company_manager': true,
  'user_id': '23',
  'user_name': '丸鐵管理者',
  'birthday': '1072886400',
  'name': '丸鐵管理者',
  'email': 'vertex_admin@compal.com',
  'gender': 'male',
  'phone': '0911221111'
}, {
  'is_company_manager': false,
  'user_id': '19',
  'description': '',
  'user_name': '林順德',
  'birthday': '485798400',
  'name': '林順德',
  'email': 'shunte_lin@compal.com',
  'gender': 'male',
  'phone': '0933123456'
}
]

export default [
  // get company list
  {
    url: '/Company/Query/all',
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
        result: companyList
      }
    }
  },
  {
    url: '/Company/Query/one',
    type: 'get',
    response: config => {
      const { token, company_id } = config.query
      // mock error
      if (!token || !company_id) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      return {
        status: 200,
        message: 'get data success',
        result: fakeResponse
      }
    }
  },
  {
    url: '/Company/Modify/update',
    type: 'post',
    response: config => {
      const { token, data } = config.body
      // mock error
      if (!token) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      return {
        status: 200,
        message: 'update success',
        result: data
      }
    }
  },
  // get company manager
  {
    url: '/User/UI/object/company',
    type: 'get',
    response: config => {
      const { token, company_id } = config.query
      // mock error
      if (!token || !company_id) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      return {
        status: 200,
        message: 'get data success',
        result: companyManager
      }
    }
  },
  // update company manager
  {
    url: '/User/UI/update/company',
    type: 'post',
    response: config => {
      const { token, company_id, user_ids } = config.body
      // mock error
      if (!token || !company_id || !user_ids) {
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

