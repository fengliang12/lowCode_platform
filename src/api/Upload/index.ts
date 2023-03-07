import instance from '../axios'

/**
 * 设置新的api
 * @param {*} data
 * @returns
 */
export const uploadFile: Api.Upload.uploadFile.Func = (data) => {
  return instance({
    url: '/uploadFile',
    method: 'post',
    data,
  })
}
