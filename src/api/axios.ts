import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const instance = axios.create({
  baseURL: '/api',
  timeout: 6000,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res: any) => {
    console.log('res', res)

    if (res.data.code === 200) {
      return res
    } else if (res.data.code === 10001) {
      ElMessage({
        message: '未登录或者登录过期,请登录',
        type: 'warning',
      })
      localStorage.removeItem('token')
      router.replace({ path: '/login' })
    } else if (res.data.code === 10002) {
      ElMessage({
        message: '权限不足',
        type: 'warning',
      })
    } else {
      ElMessage({
        message: res.data.message,
        type: 'warning',
      })
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
