import { usePageSetupStore } from '@/store/pageSetupStore'
const pageSetupStore = usePageSetupStore()

/**
 * 自定义
 * @param {*} element
 * @returns
 */
const apiComponentList = (element) => {
  return [
    {
      field: 'operationUrl',
      type: 'el-select',
      props: {
        label: 'apiName',
        value: 'id',
      },
      options: pageSetupStore.AloneApiList,
    },
  ]
}

export { apiComponentList }
