export class EventsData {
  constructor({ triggerType = 'click' } = {}) {
    this.triggerType = triggerType //执行类型 click | show | onLoad;
    this.hotOperations = []
  }
}

/**
 * 页面事件类型
 */
const pageTriggerTypeList = [
  {
    value: 'onLoad',
    label: '页面加载'
  },
  {
    value: 'pageShow',
    label: '页面显示'
  }
]

/**
 * 组件事件类型
 */
const commonTriggerTypeList = [
  {
    value: 'click',
    label: '点击'
  },
  {
    value: 'moduleShow',
    label: '组件显示'
  },
  {
    value: 'longpress',
    label: '长按事件'
  },
  ...pageTriggerTypeList
]

export const getKeyList = (list) => {
  return Object.fromEntries(list.map((item) => [item.value, item]))
}
export const triggerType = {
  // 页面事件
  page: {
    list: pageTriggerTypeList,
    key: getKeyList(pageTriggerTypeList)
  },
  common: {
    list: commonTriggerTypeList,
    key: getKeyList(commonTriggerTypeList)
  }
}
