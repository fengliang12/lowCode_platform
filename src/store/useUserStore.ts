import { login, loginByToken } from '@/api/Auth'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { useMenuStore } from './useMenuStore'
import { useButtonStore } from './useButtonStore'
import router from '@/router'

export interface userStoreType {
  token: string
  userInfo: Api.Auth.login.IResponse | null
  roles: number[]
}

export const useUserStore = defineStore('userStore', {
  state: (): userStoreType => {
    return {
      token: '',
      userInfo: null,
      roles: [],
    }
  },
  actions: {
    login(data: Api.Auth.login.IRequest) {
      login(data).then(async (res) => {
        const result = res.data
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        this.userInfo = result.data
        this.roles.push(result.data.roleId)
        this.token = result.data.token
        localStorage.setItem('token', result.data.token)
        const menuStore = useMenuStore()
        await menuStore.generateSystemMenus(result.data.roleId)
        const buttonStore = useButtonStore()
        await buttonStore.generateButtons(result.data.permissions)
        router.push({ path: '/index' })
      })
    },
    loginByToken(token: string) {
      this.token = token
      return loginByToken(token)
        .then((res) => {
          const result = res.data
          this.userInfo = result.data
          localStorage.setItem('token', result.data.token)
          const menuStore = useMenuStore()
          menuStore.generateSystemMenus(result.data.roleId)
          const buttonStore = useButtonStore()
          buttonStore.generateButtons(result.data.permissions)
          return result
        })
        .catch((error) => {
          localStorage.removeItem('token')
          return Promise.reject(error)
        })
    },
  },
})
