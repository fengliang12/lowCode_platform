declare namespace Api {
  /**
   * 用户菜单栏
   */
  namespace Menu {
    namespace public {}
    namespace getAllMenus {
      type Func = () => MRP<IResponse[]>
      interface IResponse {
        menuId: undefined | number
        type: number
        menuName: string
        router: string
        viewPath: string
        icon: string
        keepalive: number
        isShow: number
        permission: string
        title?: string
        parentId: undefined | number
        children?: menuForm[]
      }
    }
  }
}
