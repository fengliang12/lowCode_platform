import pageDataList from './pageDataList'
const getters = {
  //动态数据
  pageDataList: pageDataList,
  //api数据
  getMinApi: (state) => {
    let minApiList = []
    let minApiKey = {}
    state.PageSetupApiList.forEach((item) => {
      minApiList.push(item)
    })
    function init(list) {
      list.forEach((item) => {
        if (item?.children?.length) {
          init(item.children)
        } else {
          delete item.children
        }
        minApiKey[item.apiKey] = item
      })
    }
    init(minApiList)
    return {
      minApiList,
      minApiKey,
    }
  },
}
export default getters
