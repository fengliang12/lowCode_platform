import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

let http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

let loadingInstance

// 拦截器的添加
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    loadingInstance = ElLoading.service('加载中')
    if (userStore?.token) {
      config.headers = {
        authorization: userStore.token,
      }
    }
    return config
  },
  (err) => {
    //请求错误
    loadingInstance?.close()
    ElMessage.error('网络异常')
    return Promise.reject(err)
  },
)

//响应拦截器
http.interceptors.response.use(
  (res) => {
    loadingInstance?.close()
    return res.data
  },
  (err) => {
    //请求失败(前端做法是取消loading圈给提示)
    loadingInstance?.close()
    ElMessage.error('请求失败')
    return Promise.reject(err)
  },
)

export const request = (url, config) => {
  return http({
    url,
    ...config,
  })
}

export const GET = (url, params, config) => {
  return request(url, {
    method: 'GET',
    params,
    ...config,
  })
}

export const POST = (url, data, config) => {
  return request(url, {
    method: 'POST',
    data,
    ...config,
  })
}

export const PUT = (url, data, config) => {
  return request(url, {
    method: 'PUT',
    data,
    ...config,
  })
}

export const DELETE = (url, data, config) => {
  return request(url, {
    method: 'DELETE',
    data,
    ...config,
  })
}

export default http
