import jwtDecode from 'jwt-decode'

const ID_TOKEN_KEY = 'access'
const ID_REFRESH_KEY = 'refresh'

import axiosInstance from './axios'

export const loginByLineUserID = () => {
    return new Promise((resolve, reject) => {
        try {
            let line_data = JSON.parse(localStorage.getItem(`LIFF_STORE:${import.meta.env.VITE_LIFF_ID}:context`));
            axiosInstance.post('/api/v1/login/', {"line_token": line_data.userId})
                .then(r => {
                    saveToken(r.data.data.access);
                    saveRefresh(r.data.data.refresh);
                    resolve(r.data);
                })
                .catch(e => {
                    if (e.response.status === 404) {
                        this.$router.push('/register');
                    }
                    reject(e);
                });
        } catch (e) {
            console.error('error', e);
            reject(e);
        }
    });
};

export const fetchUser = async () => {
    try {
        let r = await axiosInstance.get('/api/v1/users/me/')
        console.log(r.data)
        
    } catch (e) {
        console.error('error', e)
    }
}

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
  loginByLineUserID,
  fetchUser
}
