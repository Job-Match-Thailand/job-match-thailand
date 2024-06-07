import jwtDecode from 'jwt-decode'

const ID_TOKEN_KEY = 'jwt'
const ID_REFRESH_KEY = 'jwt_refresh'

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}

export const getTokenDecode = () => {
  return jwtDecode(getToken())
}

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

export const getRefresh = () => {
  return window.localStorage.getItem(ID_REFRESH_KEY)
}

export const saveRefresh = token => {
  window.localStorage.setItem(ID_REFRESH_KEY, token)
}

export const destroyRefresh = () => {
  window.localStorage.removeItem(ID_REFRESH_KEY)
}

export default {
  getToken,
  getTokenDecode,
  saveToken,
  destroyToken,
  getRefresh,
  saveRefresh,
  destroyRefresh,
}
