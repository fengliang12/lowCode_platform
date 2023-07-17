import { usePageSetupStore } from '@/store/pageSetupStore'
const pageSetupStore = usePageSetupStore()
/**
 * 自定义
 * @param {*} element
 * @returns
 */
const subscribeNoticeComponentList = (element) => {
  return [
    {
      field: 'operationUrl',
      type: 'subscribe-notices-select',
    },
  ]
}

export { subscribeNoticeComponentList }
