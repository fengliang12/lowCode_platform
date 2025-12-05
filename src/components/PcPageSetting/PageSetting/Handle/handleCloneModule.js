import handleModule from './handleModule'
import { generateId } from './util'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
import componentsMapping from '../CommonData/componentsMapping'
import data from '../Common/hotView/data'
const pageSetupStore = usePageSetupStore()

/**
 * 拷贝组件数据，并生成新的code
 * @param {*} pageSetting
 * @param {*} itemsMap
 * @returns
 */
const cloneDeepModule = (pageSetting, itemsMap) => {
  // 新老组件code映射
  const codeMap = {}
  let mess = false
  const new_pageSetting = cloneDeep(pageSetting)
  handleModule(new_pageSetting, ({ data }) => {
    const moduleType = data.code.split('_')[0]
    const code = generateId(moduleType, data.code, itemsMap)
    if (data.code != code) {
      mess = true
      codeMap[data.code] = code
      pageSetupStore.setPageItemsMap({
        opt: 'set',
        items: data,
      })
    }
    data.code = code
    data.title = `${componentsMapping[moduleType].name}_${code}`
  })

  console.log('new_pageSetting', new_pageSetting, mess)

  if (mess) {
    ElMessage.warning({
      message: `注意：组件编号被修改`,
      showClose: true,
      duration: 2000,
    })
  }
  return { new_pageSetting, codeMap }
}
export default cloneDeepModule
