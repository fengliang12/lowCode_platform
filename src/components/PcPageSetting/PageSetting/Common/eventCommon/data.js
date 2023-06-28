export class EventsData {
  constructor({ triggerType = 'click' } = {}) {
    this.triggerType = triggerType //执行类型 click | show | onLoad;
    this.hotOperations = []
    this.watchValueList = []
  }
}

/**
 * 页面事件类型
 */
const pageTriggerTypeList = [
  {
    value: 'onLoad',
    label: '页面加载',
  },
  {
    value: 'pageShow',
    label: '页面显示',
  },
  {
    value: 'unload',
    label: '页面卸载',
  },
  {
    value: 'dataWatch',
    label: '数据监听',
  },
]

/**
 * 组件事件类型
 */
const commonTriggerTypeList = [
  {
    value: 'click',
    label: '点击',
  },
  {
    value: 'moduleShow',
    label: '组件显示',
  },
  {
    value: 'moduleHide',
    label: '组件隐藏',
  },
  {
    value: 'longpress',
    label: '长按事件',
  },
  {
    value: 'onPlayEnd',
    label: '播放完成',
  },
  {
    value: 'onError',
    label: '加载失败',
  },
  {
    value: 'slideUp',
    label: '向上滑动',
  },
  {
    value: 'slideRight',
    label: '向右滑动',
  },
  {
    value: 'slideDown',
    label: '向下划动',
  },
  {
    value: 'slideLeft',
    label: '向左滑动',
  },
  ...pageTriggerTypeList,
]

//轮播事件
export const swiperTriggerType = [
  ...commonTriggerTypeList,
  {
    value: 'swiperChange',
    label: '轮播改变',
  },
]

//微信按钮事件
export const weChatButtonTriggerTypeList = [
  ...commonTriggerTypeList,
  {
    value: 'success',
    label: '成功',
  },
  {
    value: 'fail',
    label: '失败',
  },
]

//轮播事件
export const swiperChangeTriggerTypeList = [
  ...commonTriggerTypeList,
  ...swiperTriggerType,
]

export const getKeyList = (list) => {
  return Object.fromEntries(list.map((item) => [item.value, item]))
}

export const triggerType = {
  // 页面事件
  page: {
    list: pageTriggerTypeList,
    key: getKeyList(pageTriggerTypeList),
  },
  common: {
    list: commonTriggerTypeList,
    key: getKeyList(commonTriggerTypeList),
  },
  //微信按钮
  weChatButton: {
    list: weChatButtonTriggerTypeList,
    key: getKeyList(weChatButtonTriggerTypeList),
  },
  //轮播组件
  carousel: {
    list: swiperChangeTriggerTypeList,
    key: getKeyList(swiperChangeTriggerTypeList),
  },
}
