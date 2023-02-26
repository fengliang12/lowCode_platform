declare namespace Api {
  /**
   * 用户登录接口
   */
  namespace Auth {
    namespace public {}
    namespace getCode {
      type Func = () => MRP<IResponse>
      interface IResponse {
        svg: string
        text: string
      }
    }
    namespace login {
      type Func = (data: IRequest) => MRP<IResponse>
      interface IRequest {
        username: string
        password: string
        verifyCode: string
      }
      interface IResponse {
        avatar: string
        depId: number
        id: number
        password: string
        permissions: Array<string>
        roleId: number
        roleName: string
        status: boolean
        authorization: string
        username: string
      }
    }
    namespace loginByToken {
      type Func = (token: string) => MRP<IResponse>
      interface IResponse {
        avatar: string
        depId: number
        id: number
        password: string
        permissions: Array<string>
        roleId: number
        roleName: string
        status: boolean
        token: string
        username: string
        authorization: string
      }
    }
  }
}
