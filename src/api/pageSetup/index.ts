import instance from '../axios'

/**
 * 获取页面类型
 * @returns
 */
export const getPageSettingConstant: Api.PageSetup.getPageSettingConstant.Func =
  () => {
    return instance({
      url: `/page_setup/page_types`,
      method: 'get',
    })
  }

/**
 * 获取所有配置页面列表
 * @returns
 */
export const getAllPage: Api.PageSetup.getAllPage.Func = () => {
  return instance({
    url: `/page_setup/list`,
    method: 'get',
  })
}

/**
 * 获取所有会员标签
 * @returns
 */
export const getMemberTagAll: Api.PageSetup.getAllPage.Func = () => {
  return instance({
    url: `/member-manage/store/gac/customer_tag/list`,
    method: 'get',
  })
}

/**
 * 根据页面id获取页面配置
 */
export const getPageSetupList: Api.PageSetup.getPageDetail.Func = (data) => {
  return instance({
    url: `/pageSetup/getPageSetupList`,
    method: 'get',
    params: data,
  })
}

/**
 * 根据页面id获取页面配置
 */
export const getPageSetupInfo: Api.PageSetup.getPageDetail.Func = (id) => {
  return instance({
    url: `/pageSetup/getDetail?id=${id}`,
    method: 'get',
  })
}

/**
 * 创建页面配置
 * @param {*} data
 * @returns
 */
export const createPageSetup: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/pageSetup/create',
    method: 'post',
    data,
  })
}

/**
 * 更新页面配置
 * @param {*} data
 * @returns
 */
export const updatePageSetup: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/pageSetup/update',
    method: 'put',
    data,
  })
}

/**
 * 删除页面配置
 * @param {*} data
 * @returns
 */
export const deletePageSetup: Api.PageSetup.createPage.Func = (id) => {
  return instance({
    url: `/pageSetup/delete/${id}`,
    method: 'delete',
  })
}

/**
 *获取总的api
 * @returns
 */
export const getOperationApi: Api.PageSetup.getAllPage.Func = () => {
  return instance({
    url: `/pageSetupApi/list`,
    method: 'get',
  })
}

/**
 *获取总的api
 * @returns
 */
export const getOperationApiDetail = (id: any) => {
  return instance({
    url: `/pageSetupApi/detail?id=${id}`,
    method: 'get',
  })
}

/**
 * 创建新的api
 * @param {*} data
 * @returns
 */
export const createOperationApi: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/pageSetupApi/create',
    method: 'post',
    data,
  })
}

/**
 * 更新api
 * @param {*} data
 * @returns
 */
export const updateOperationApi: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/pageSetupApi/update',
    method: 'put',
    data,
  })
}

/**
 * 删除旧的api
 * @param {*} data
 * @returns
 */
export const delOperationApi: Api.PageSetup.createPage.Func = (id) => {
  return instance({
    url: `/pageSetupApi/delete/${id}`,
    method: 'delete',
  })
}
