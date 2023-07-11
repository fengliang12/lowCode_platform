import { ElMessage } from 'element-plus'
import cloneDeepModule from './handleCloneModule'
import updateModuleCode from './updateModuleCode'
import { usePageSetupStore } from '@/store/pageSetupStore'
// 复制数据处理
const setCopyData = async ({
  data,
  AloneApiList,
  pageSetupId,
  otherConfig,
  itemsMap,
}: any) => {
  const pageSetupStore = usePageSetupStore()
  // api列表数据处理
  const apiList = data?.customApiList?.filter(Boolean) || []
  const mapApi = {}
  const reqList: any = []
  apiList.forEach((item: any) => {
    let has = false
    //判断apiInfoId和apiKey相同视为同一api不新增
    has =
      AloneApiList.length !== 0 &&
      AloneApiList.find(
        (val: any) =>
          item.apiInfoId === val.apiInfoId && item.apiKey === val.apiKey,
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
      reqList.map((elem: any) => otherConfig.setupOperationApi(elem)),
    ).catch((err) => {
      console.log('err', err)
      ElMessage.error('自动添加api失败请手动操作')
    })
    //查询api列表
    otherConfig.getPageApiList()
    reqList.forEach((old: any, index: number) => {
      mapApi[old.id] = reqListRes[index].id
    })
  }
  //copy组件
  const cloneData = await cloneDeepModule(data, itemsMap)

  return updateModuleCode(
    //clone数据
    cloneData,
    //新老code映射
    pageSetupStore.moduleCode,
    //新老api映射
    mapApi,
  )
}
export default setCopyData
