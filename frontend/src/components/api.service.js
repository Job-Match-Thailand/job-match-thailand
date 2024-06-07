// import { createApp } from 'vue'
// import router from '@/router'
// // import i18n from 'i18next'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import store from '../store'
// import JwtService from "@/components/jwt.service";
// import App from "@/App";
// // import { SET_TOKEN } from '../store/mutations.type'

// const ApiService = {
//   init() {
//     Vue.use(VueAxios, axios)
//     Vue.axios.defaults.baseURL =
//       process.env.NODE_ENV !== 'production'
//         ? process.env.VUE_APP_BACKEND_URL
//         : ''
//     axios.interceptors.request.use(
//       async function (config) {
//         // console.log('Where to go', config.url)
//         if (config.url.includes('public')) {
//           // console.log('Load setting..')
//           return config
//         } else if (!config.url.includes('authen')) {
//           // console.log('Wait for GET_AUTH')
//           await store.dispatch("GET_AUTH")

//           if (!store.getters.token) {
//             store.commit(SET_TOKEN, JwtService.getToken())
//           }
//           config.headers['Authorization'] = 'Bearer ' + store.getters.token

//           // if (!config.headers['Accept-Language']) {
//           //   // config.headers['Accept-Language'] = i18n.language
//           // }
//         }
//         return config
//       },
//       function (error) {
//         return Promise.reject(error)
//       }
//     )

//     axios.interceptors.response.use(
//       function (response) {
//         return response
//       },
//       async function (error) {
//         // Intercept response 401 กรณี refresh token หมดอายุ ให้ redirect ไปหน้า LOGIN?
//         // If you can't refresh your token or you are sent Unauthorized on any request, logout and go to login
//         if (error.request !== undefined) {
//           // Check if the pathname starts with "/refresh"
//           const url = new URL(error.request.responseURL)
//           if (
//             url.pathname.startsWith('/api/v1/authen/token/refresh') ||
//             (error.request.status === 401 && error.config.__isRetryRequest)
//           ) {
//             let response = JSON.parse(error.request.response)
//             let message = response.detail || i18n.t('session_timeout')
//             store.dispatch(ADD_SNACKBAR, {
//               message: message,
//               color: 'error',
//             })
//             store.dispatch(LOGOUT).then(() =>
//               router.push({
//                 path: '/login',
//               })
//             )
//           } else if (error.request.status === 403) {
//             // Intercept response 403 กรณี user ไม่มีสิทธิ์
//             router.replace({ name: 'forbidden' })
//           } else if (error.request.status === 401) {
//             error.config.__isRetryRequest = true
//             return axios.request(error.config)
//           } else if (error.request.status === 409) {
//             console.log(error)
//             if (error.response.data.code === 'conflict_selected_branch') {
//               store.dispatch('branch/SHOW_BRANCH_CONFLICT_DIALOG')
//               store.commit('branch/SET', {
//                 selected_branch: Number(error.response.data.branch_id),
//               })
//               return Promise.reject(new Error('conflict_selected_branch'))
//             }
//           }
//         }
//         return Promise.reject(error)
//       }
//     )

//     /**
//      * Override axios.get function ให้ใช้งานกับ dynamic-rest DynamicModelViewSet ได้ง่ายขึ้น
//      * https://github.com/AltSchool/dynamic-rest
//      *
//      * ตัวอย่างการใช้งาน:
//      * this.$http.get('/api/v2/opd/opd/', {
//      *   params: { page: 1, per_page: 5 },
//      *   includes: ['opditem_set.*', 'opditem_set.performer_set.*'],
//      *   excludes: ['paid_flag', 'del_flag'],
//      *   filters: {
//      *     'patient_id': 1,
//      *     'create_date.gte': '2020-04-01'
//      *   },
//      *   sorts: ['-create_date']
//      * })
//      *
//      * */
//     Vue.axios.get = (
//       url,
//       { includes = [], excludes = [], filters = {}, sorts = [], ...args } = {}
//     ) => {
//       const params = new URLSearchParams()

//       for (let inc of includes) {
//         if (typeof inc === 'string') params.append('include[]', inc)
//         else if (typeof inc === 'object') {
//           let key = Object.keys(inc)[0]
//           for (let sub_inc of inc[key])
//             params.append('include[]', `${key}.${sub_inc}`)
//         }
//       }

//       for (let exc of excludes) {
//         if (typeof exc === 'string') params.append('exclude[]', exc)
//         else if (typeof exc === 'object') {
//           let key = Object.keys(exc)[0]
//           for (let sub_exc of exc[key])
//             params.append('exclude[]', `${key}.${sub_exc}`)
//         }
//       }

//       for (let f in filters) {
//         if (Array.isArray(filters[f])) {
//           for (let item of filters[f]) {
//             params.append(`filter{${f}}`, item)
//           }
//           continue
//         }
//         params.append(`filter{${f}}`, filters[f])
//       }

//       for (let sort of sorts) {
//         params.append('sort[]', sort)
//       }

//       for (let key in args.params) {
//         if (args.params[key] !== null && args.params[key] !== undefined) {
//           let value = args.params[key]
//           if (Array.isArray(value)) {
//             for (let item of value) params.append(`${key}[]`, item)
//           } else {
//             params.append(key, value)
//           }
//         }
//       }

//       delete args['params']
//       return Vue.axios.request({
//         method: 'get',
//         url: url,
//         params: params,
//         ...args,
//       })
//     }
//   },
// }

// export default ApiService

// import * as Vue from 'vue' // in Vue 3
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// const ApiService = {
//   init() {
//     const app = Vue.createApp()
//     app.use(VueAxios, axios)
//   }
// }

// export default ApiService