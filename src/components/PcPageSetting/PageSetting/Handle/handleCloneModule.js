import handleModule from './handleModule'
import { generateId } from './util'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
const pageSetupStore = usePageSetupStore()

const cloneDeepModule = (pageSetting, itemsMap) => {
  const new_pageSetting = cloneDeep(pageSetting)
  const moduleCode = {}
  let mess = false
  handleModule(new_pageSetting, ({ data }) => {
    const moduleType = data.code.split('_')[0]
    const code = generateId(moduleType, data.code, itemsMap)
    if (data.code != code) {
      mess = true
      moduleCode[data.code] = code
      pageSetupStore.setPageItemsMap({
        opt: 'set',
        items: data,
      })
    }
    data.code = code
  })
  if (mess) {
    ElMessage.warning({
      message: `注意：组件编号被修改`,
      showClose: true,
      duration: 2000,
    })
    pageSetupStore.setModuleCode(moduleCode)
  }
  return new_pageSetting
}
export default cloneDeepModule
