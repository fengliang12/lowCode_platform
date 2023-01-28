import instance from '@/api/axios'

export const getAllMenus: Api.Menu.getAllMenus.Func = () => {
  return instance({
    url: '/sysMenu/list',
    method: 'get',
  })
}
