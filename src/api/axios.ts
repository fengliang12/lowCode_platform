import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const isProdRuntime = import.meta.env.PROD || import.meta.env.MODE === 'prod'
const baseURL = isProdRuntime ? 'https://low-code-node.vercel.app/api' : '/api'

const instance = axios.create({
  baseURL,
  timeout: 6000,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authorization')
    if (token) {
      config.headers['authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res: any) => {
    if (res.data.code === 200) {
      return res
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
    //console.log('network error', error)
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      ElMessage({
        message: '登录过期,请登录',
        type: 'warning',
      })
      router.replace({ path: '/login' })
    }
    return Promise.reject(error)
  },
)

export default instance
