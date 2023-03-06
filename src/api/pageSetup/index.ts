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
 *获取总的api
 * @returns
 */
export const getPageSetupApi: Api.PageSetup.getAllPage.Func = () => {
  return instance({
    url: `/member-manage/store/page_setup_api_info/tree/info`,
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
 * 获取人群
 * @returns
 */
export const getCrowdAll: Api.PageSetup.getAllPage.Func = () => {
  return instance({
    url: `//member-manage/store/gac/customer/crowd/findList`,
    method: 'get',
  })
}

/**
 * 根据页面id获取数据
 */
export const getPageDetail: Api.PageSetup.getPageDetail.Func = (id) => {
  return instance({
    url: `/page_setup/item/${id}`,
    method: 'get',
  })
}

/**
 * 创建新的
 * @param {*} data
 * @returns
 */
export const createPage: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/page_setup',
    method: 'post',
    data,
  })
}

/**
 * 更新旧的
 * @param {*} data
 * @returns
 */
export const updatePage: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/page_setup',
    method: 'put',
    data,
  })
}

/**
 * 删除旧的api
 * @param {*} data
 * @returns
 */
export const delOperationApi: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/page_setup_api',
    method: 'delete',
    data,
  })
}

/**
 * 设置新的api
 * @param {*} data
 * @returns
 */
export const setupOperationApi: Api.PageSetup.createPage.Func = (data) => {
  return instance({
    url: '/page_setup_api',
    method: 'post',
    data,
  })
}
