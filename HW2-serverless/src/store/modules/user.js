import { login, logout } from '@/api/login-model'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter, asyncRouterMap } from '@/router'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { result } = response
        setToken(result.token)
        commit('SET_TOKEN', result.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // user role
  setRole({ commit }, role) {
    return new Promise(resolve => {
      commit('SET_ROLE', role)
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

