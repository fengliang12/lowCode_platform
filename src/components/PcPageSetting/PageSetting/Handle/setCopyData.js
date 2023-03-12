// 复制数据处理
const setCopyData = async ({
  data,
  AloneApiList = store.state.pageSetting.AloneApiList,
  pageSetupId = store.state.pageSetting.id,
  otherConfig,
  itemsMap,
}) => {
  // api列表数据处理
  const apiList = data?.customApiList?.filter(Boolean) || []
  const mapApi = {}
  let reqList = []
  apiList.forEach((item) => {
    let has = false
    //判断apiInfoId和apiKey相同视为同一api不新增
    has =
      AloneApiList.length !== 0 &&
      AloneApiList.find(
        (val) => item.apiInfoId === val.apiInfoId && item.apiKey === val.apiKey,
      )
    if (has) {
      mapApi[item.id] = has.id
    }
    if (!has || AloneApiList.length === 0) {
      reqList.push({
        ...item,
        pageSetupId,
      })
    }
  })
  if (reqList.length) {
    const reqListRes = await Promise.all(
      reqList.map((elem) => otherConfig.setupOperationApi(elem)),
    ).catch((err) => {
      console.log('err', err)
      Message.error('自动添加api失败请手动操作')
    })
    //查询api列表
    otherConfig.getPageApiList()
    reqList.forEach((old, index) => {
      mapApi[old.id] = reqListRes[index].id
    })
  }
  //copy组件
  const cloneData = await cloneDeepModule(data, itemsMap)
  return updateModuleCode(
    //clone数据
    cloneData,
    //新老code映射
    store.state.pageSetting.moduleCode,
    //新老api映射
    mapApi,
  )
}
export default setCopyData
