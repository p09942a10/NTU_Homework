const allCompanySiteList = [
  {
    company_id: '1',
    company_title: '文化大學 ',
    site_count: 2,
    site_info: [{
      site_id: '1',
      title: '文化推廣部',
      phone: '0988888666',
      is_deleted: '0',
      description: '',
      user_count: 1
    }, {
      site_id: '5',
      title: '推廣部',
      phone: '0988272727',
      is_deleted: '0',
      description: '',
      user_count: 1
    }]
  }, {
    company_id: '2',
    company_title: '玩鐵 ',
    site_count: 1,
    site_info: [{
      site_id: '7',
      title: '高美館',
      phone: '0988777666',
      is_deleted: '0',
      description: '',
      user_count: 9
    }]
  }]
const oneCompanySiteList = [{
  company_id: '2',
  company_title: '玩鐵 ',
  site_count: 1,
  site_info: [{
    site_id: '7',
    title: '高美館',
    phone: '0988777666',
    is_deleted: '0',
    description: '',
    user_count: 9
  }]
}]
const oneSiteInfo =
  {
    'company_id': '7',
    'company_title': '玩鐵',
    'title': '高美館',
    'phone': '0988777666',
    'is_deleted': '0',
    'description': '',
    'user_count': 9
  }

export default [
  // get site list
  {
    url: '/Site/Query/list',
    type: 'get',
    response: config => {
      const { token, company_id } = config.query
      // mock error
      if (!token) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      if (company_id === '') {
        return {
          status: 200,
          message: 'get data success',
          result: allCompanySiteList
        }
      } else {
        return {
          status: 200,
          message: 'get data success',
          result: oneCompanySiteList
        }
      }
    }
  },
  {
    url: '/Site/Modify/update',
    type: 'post',
    response: config => {
      const { token } = config.body
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
        result: config.body
      }
    }
  },
  // query one site
  {
    url: '/Site/Query/one',
    type: 'get',
    response: config => {
      const { token, site_id } = config.query
      // mock error
      if (!token || !site_id) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      } else {
        return {
          status: 200,
          message: 'get data success',
          result: oneSiteInfo
        }
      }
    }
  },
  // get site manager
  {
    url: '/User/UI/object/site',
    type: 'get',
    response: config => {
      const { token, site_id } = config.query
      // mock error
      if (!token || !site_id) {
        return {
          status: 60204,
          result: 'Query error.'
        }
      }
      return {
        status: 200,
        message: 'get data success',
        result: [{
          'is_site_manager': true,
          'is_site_user': false,
          'user_id': '23',
          'user_name': 'user A',
          'birthday': '1072886400',
          'name': 'user A',
          'email': 'vertex_admin@compal.com',
          'gender': 'male',
          'phone': '0911221111'
        }, {
          'is_site_manager': false,
          'is_site_user': true,
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

      }
    }
  },
  // update site manager
  {
    url: '/User/UI/update/site',
    type: 'post',
    response: config => {
      const { token, site_id, user_ids } = config.body
      // mock error
      if (!token || !site_id || !user_ids) {
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

