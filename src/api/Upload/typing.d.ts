declare namespace Api {
  /**
   * 用户登录接口
   */
  namespace Upload {
    namespace public {}
    namespace uploadFile {
      type Func = (data: any) => MRP<IResponse>
      interface IResponse {
        url: string
      }
    }
  }
}
