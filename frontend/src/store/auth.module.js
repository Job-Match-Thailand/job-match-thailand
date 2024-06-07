// import Vue from 'vue'
// import router from "@/router";
// import JwtService from "@/components/jwt.service";
// import PermsService from '../common/perms.service'
// import {
//   LOGIN,
//   LOGOUT,
//   CHANGE_BRANCH,
//   GET_AUTH,
//   REFRESH_AUTH,
//   ADD_SNACKBAR,
// } from './actions.type'
// import { SET_AUTH, PURGE_AUTH, CLEAR_QUEUE, SET_TOKEN } from './mutations.type'
// import i18next from 'i18next'

const state = {
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  perms: [],
  token: '',
}

const getters = {}
const actions = {}

// const getters = {
//   currentUser(state) {
//     state.user.full_name = `${state.user.first_name} ${state.user.last_name}`
//     if (state.user.groups) {
//       state.user.is_owner =
//         state.user.groups.findIndex(e => e.name === 'Owner') > -1
//       state.user.is_doctor =
//         state.user.groups.length === 1 && state.user.groups[0].name === 'Doctor'
//     } else {
//       state.user.is_owner = false
//       state.user.is_doctor = false
//     }
//
//     return state.user
//   },
//   // currencyUnit(state) {
//   //   return i18next.t(`currency_${state.user.currency}`)
//   // },
//   isAuthenticated(state) {
//     return state.isAuthenticated
//   },
//   isDoctor(state) {
//     return (
//       state.user.groups.length === 1 && state.user.groups[0].name === 'Doctor'
//     )
//   },
//   hasGroup: state => groupName => {
//     return state.user.groups
//       .map(g => {
//         if (g.name.includes('|')) {
//           let roles = g.name.split('|')
//           roles.shift()
//           return roles.join('|')
//         }
//         return g.name
//       })
//       .join('|')
//       .includes(groupName)
//   },
//
//   /*
//     use with "mapGetters" hasPerms('some_perm')
//     or $store.getters.hasPerms('some_perm')
//   */
//   hasPerms(state) {
//     return keyword => {
//       return state.perms.indexOf(keyword) !== -1
//     }
//   },
//
//   token(state) {
//     return state.token
//   },
// }
//
// const actions = {
//   async [LOGIN]({ dispatch, commit }, credentials) {
//     try {
//       let { data } = await Vue.axios.post('/api/v1/authen/token/', credentials)
//       if (['smsotp', 'totp'].includes(data.message)) {
//         return data
//       }
//       return commit(SET_AUTH, data)
//     } catch ({ response }) {
//       dispatch(ADD_SNACKBAR, {
//         message: response.data.non_field_errors[0],
//         color: 'error',
//       })
//       throw new Error(response.data.non_field_errors[0])
//     }
//   },
//
//   async [LOGOUT]({ commit }) {
//     try {
//       await Vue.axios.delete(`/api/v1/user/clear-selected-room/`)
//     } catch {}
//     await commit(CLEAR_QUEUE)
//     await commit(PURGE_AUTH)
//   },
//
//   async [CHANGE_BRANCH]({ dispatch, commit }, selectedBranch) {
//     try {
//       let { data } = await Vue.axios.post(
//         '/api/v1/user/change-branch/',
//         selectedBranch
//       )
//       commit(SET_AUTH, data)
//     } catch ({ response }) {
//       throw new Error(response.data)
//     }
//   },
//
//   // async [REFRESH_AUTH] ({ commit }) {
//   //   if (JwtService.getRefresh()) {
//   //     try {
//   //       console.log('REFRESH_AUTH')
//   //       let { data } = await Vue.axios.post('/api/v1/authen/token/refresh/', { refresh: JwtService.getRefresh() })
//   //       console.log(data)
//   //       commit(SET_AUTH, data)
//   //     } catch ({ response }) {
//   //       commit(PURGE_AUTH)
//   //     }
//   //   } else {
//   //     commit(PURGE_AUTH)
//   //   }
//   // },
//   // async [CHECK_AUTH] ({ dispatch, commit }) {
//   //   if (JwtService.getToken()) {
//   //     try {
//   //       console.log('CHECK_AUTH')
//   //       let { data } = await Vue.axios.post('/api/v1/authen/token/verify/', { token: JwtService.getToken() })
//   //       commit(SET_AUTH, data)
//   //     } catch ({ response }) {
//   //       if (response.status === 401) {
//   //         console.log('Try to refresh')
//   //         await dispatch(REFRESH_AUTH)
//   //       }
//   //     }
//   //   } else {
//   //     commit(PURGE_AUTH)
//   //   }
//   // },
//   async [REFRESH_AUTH]({ commit }) {
//     if (JwtService.getRefresh()) {
//       try {
//         // console.log('REFRESH_AUTH')
//         let { data } = await Vue.axios.post('/api/v1/authen/token/refresh/', {
//           refresh: JwtService.getRefresh(),
//         })
//         commit(SET_AUTH, data)
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           commit(PURGE_AUTH)
//         }
//       }
//     } else {
//       commit(PURGE_AUTH)
//     }
//   },
//
//   async [GET_AUTH]({ dispatch, commit }, checkTokenExpire = true) {
//     if (!checkTokenExpire) {
//       try {
//         return await dispatch(REFRESH_AUTH)
//       } catch (e) {
//         console.log('REFRESH_AUTH -> ERROR: ', e)
//       }
//     }
//     // Check, Is token expired?
//     if (Math.floor(Date.now() / 1000) > JwtService.getTokenDecode().exp - 300) {
//       // console.log('Token < Date.now')
//       try {
//         return await dispatch(REFRESH_AUTH)
//       } catch (e) {
//         console.log('REFRESH_AUTH -> ERROR: ', e)
//       }
//     } else {
//       return new Promise(resolve => {
//         resolve(commit(SET_AUTH))
//       })
//     }
//   },
// }

// const mutations = {
//   [SET_AUTH](state, data = {}) {
//     state.isAuthenticated = true
//     // if (data.perms) PermsService.savePerms(data.perms)
//     if (data.refresh) JwtService.saveRefresh(data.refresh)
//     if (data.access) JwtService.saveToken(data.access)
//     state.token = JwtService.getToken()
//     state.user = JwtService.getTokenDecode().user
//     state.user.id = JwtService.getTokenDecode().user_id
//     // state.perms = PermsService.getPerms()
//   },
//   [PURGE_AUTH](state) {
//     state.isAuthenticated = false
//     state.user = {}
//     state.perms = []
//     state.token = ''
//     JwtService.destroyToken()
//     JwtService.destroyRefresh()
//     // PermsService.destroyPerms()
//     // console.log('PURGE_AUTH')
//   },
//   [SET_TOKEN](state, token) {
//     state.token = token
//   },
// }

export default {
  state,
  actions,
  // mutations,
  getters,
}
