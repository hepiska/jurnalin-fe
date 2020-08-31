import axios from 'axios'
const BASE_URL = "http://localhost:4000"




export const request = axios.create({ baseURL: BASE_URL })


request.interceptors.request.use(
  async config => {
    const token =  localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)