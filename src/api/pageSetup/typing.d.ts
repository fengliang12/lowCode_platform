declare namespace Api {
  /**
   * 用户登录接口
   */
  namespace PageSetup {
    namespace public {}
    namespace getPageSettingConstant {
      type Func = () => MRP<IResponse>
      interface IResponse {
        svg: string
        text: string
      }
    }
    namespace getAllPage {
      type Func = () => MRP<IResponse>

      interface IResponse {
        avatar: string
      }
    }
    namespace getPageDetail {
      type Func = (id: string) => MRP<IResponse>
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
    namespace createPage {
      type Func = (data: any) => MRP<IResponse>
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
