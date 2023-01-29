import instance from '@/api/axios'

export const getAllMenus: Api.Menu.getAllMenus.Func = () => {
  return instance({
    url: '/sysMenu/list',
    method: 'get',
  })
}

export const getLevelMenus: Api.Menu.getLevelMenus.Func = () => {
  return instance({
    url: '/sysMenu/listLevel',
    method: 'get',
  })
}

export const addMenu: Api.Menu.addMenu.Func = (data) => {
  return instance({
    url: '/sysMenu/',
    method: 'post',
    data: data,
  })
}

export const updateMenu: Api.Menu.updateMenu.Func = (menuObj) => {
  return instance({
    url: '/sysMenu/updateMenu',
    method: 'put',
    data: menuObj,
  })
}

export const deleteMenu: Api.Menu.deleteMenu.Func = (data) => {
  return instance({
    url: '/sysMenu/batch',
    method: 'delete',
    data: data,
  })
}

export const selectUserMenu: Api.Menu.selectUserMenu.Func = (roleId) => {
  return instance({
    url: '/sysMenu/selectUserMenu/' + roleId,
    method: 'get',
  })
}
