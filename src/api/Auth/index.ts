import instance from '../axios'

// 获取验证码
export const getCode: Api.Auth.getCode.Func = () => {
  return instance({
    url: '/auth/code',
    method: 'get',
  })
}

// 账号密码登录
export const login: Api.Auth.login.Func = (data) => {
  return instance({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

// 通过token直接登录
export const loginByToken: Api.Auth.loginByToken.Func = (token: string) => {
  return instance({
    url: '/auth/loginByToken?token=' + token,
    method: 'get',
  })
}
