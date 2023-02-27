import { login, loginByToken } from '@/api/Auth'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { useMenuStore } from './useMenuStore'
import { useButtonStore } from './useButtonStore'
import router from '@/router'

export interface userStoreType {
  authorization: string
  userInfo: Api.Auth.login.IResponse | null
  roles: number[]
}

export const useUserStore = defineStore('userStore', {
  state: (): userStoreType => {
    return {
      authorization: '',
      userInfo: null,
      roles: [],
    }
  },
  actions: {
    login(data: Api.Auth.login.IRequest) {
      login(data).then(async (res) => {
        console.log('login', res)

        const result = res.data
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        this.userInfo = result.data
        this.roles.push(result.data.roleId)
        this.authorization = result.data.authorization
        localStorage.setItem('authorization', result.data.authorization)
        const menuStore = useMenuStore()
        await menuStore.generateSystemMenus(result.data.roleId)
        const buttonStore = useButtonStore()
        await buttonStore.generateButtons(result.data.permissions)
        router.push({ path: '/index' })
      })
    },
    loginByToken(authorization: string) {
      this.authorization = authorization
      return loginByToken(authorization)
        .then((res) => {
          const result = res.data
          this.userInfo = result.data
          localStorage.setItem('authorization', result.data.authorization)
          const menuStore = useMenuStore()
          menuStore.generateSystemMenus(result.data.roleId)
          const buttonStore = useButtonStore()
          buttonStore.generateButtons(result.data.permissions)
          return result
        })
        .catch((error) => {
          localStorage.removeItem('authorization')
          return Promise.reject(error)
        })
    },
  },
})
