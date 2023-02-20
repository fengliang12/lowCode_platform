declare namespace Api {
  /**
   * 用户菜单栏
   */
  namespace Menu {
    namespace Public {
      interface IRequest {
        menuId: number
        type: number
        menuName: string
        router: string
        viewPath: string
        icon: string
        keepalive: number
        isShow: number
        title: string
        permission: string
        orderNum: number
        parentId: number
      }
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
    namespace getAllMenus {
      type Func = () => MRP<Public.IResponse[]>
    }
    namespace getLevelMenus {
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
    namespace addMenu {
      type Func = (data: Public.IRequest) => MRP<object>
    }
    namespace updateMenu {
      type Func = (data: Public.IRequest) => MRP<object>
    }
    namespace deleteMenu {
      type Func = (data: object) => MRP<object>
    }
    namespace selectUserMenu {
      type Func = (roleId: number) => MRP<Public.IResponse[]>
    }
  }
}
