import { ImageSettingData } from '../fissionImage/data'

// PageSetupHotOperation {
//   apiInfo (PageApiInfo, optional): API请求 ,
//   child (Array[PageSetupHotOperation], optional),
//   conditionsForExecution (ConditionsForExecution, optional): 执行条件 ,
//   content (string, optional): 内容 ,
//   imageSetting (ImageSetting, optional): 图片配置 ,
//   linkMiniAppId (string, optional): 关联小程序AppId ,
//   moduleOperation (string, optional): 组件操作 ,
//   name (string, optional): 名称 ,
//   operationType (string, optional): 操作类型 ,
//   operationUrl (string, optional): 可以放 弹窗url、小程序url、页面配置编号 ,
//   pageValue (PageValue, optional): 页面 key Word ,
//   params (Array[PageApiInfoParams], optional): 请求数据 ,
//   subscribeNotices (Array[SubscribeSetting], optional): 微信订阅消息列表 ,
//   syncEvent (PageSyncEvent, optional)
// }

export class EventList extends Array {
  constructor(list = []) {
    super()
    return [
      {
        value: 'pop_ups',
        label: '弹窗',
        disabled: false,
      },
      {
        value: 'custom_event',
        label: '自定义事件',
        disabled: false,
      },
      {
        value: 'jump',
        label: '跳转事件',
        disabled: false,
        children: [
          {
            value: 'page_jump',
            label: '小程序页面',
            disabled: false,
          },
          {
            value: 'page_setting',
            label: '配置页面',
            disabled: false,
          },
          {
            value: 'jump_relevance_mini',
            label: '其他小程序',
            disabled: false,
          },
          {
            value: 'jump_h5',
            label: '跳转h5页面',
            disabled: false,
          },
        ],
      },
      {
        value: 'subscribe_notice',
        label: '订阅消息',
        disabled: false,
      },
      {
        value: 'api',
        label: 'api请求事件',
        disabled: false,
      },
      {
        value: 'associated_module',
        label: '操作组件',
        disabled: false,
      },
      {
        value: 'auth',
        label: '授权',
        disabled: false,
      },
      {
        value: 'set_params',
        label: '页面数据赋值',
      },
      ...list,
    ]
  }
}

export class PageHotOperation {
  constructor({ operationType = '', params = null } = {}) {
    // 操作类型
    this.operationType = operationType
    // 关联小程序的appID
    this.linkMiniAppId = ''
    // 可以放置 弹窗的url 小程序的url 页面配置编号
    this.operationUrl = ''
    //内容
    this.content = ''
    // 微信订阅消息列表
    this.subscribeNotices = []
    // 弹窗配置
    this.imageSetting =
      operationType === 'pop_ups' ? new ImageSettingData({ width: 680 }) : null
    // 执行条件
    this.conditionsForExecution = null
    // 组件
    this.moduleOperation = ''
    // api请求
    this.apiInfo = null
    // 携带参数
    this.params = params
    // 取值
    this.pageValue = null
    // child
    this.child = []
  }
}

/**
 * 赋值操作
 */
export const assignmentOption = [
  {
    value: 'equal',
    label: '等于',
  },
  {
    value: 'push',
    label: '数组添加',
  },
  {
    value: 'splice',
    label: '数组删除',
  },
  {
    value: 'countDown',
    label: '倒计时',
    params: [
      {
        key: 'delay',
        pageValue: {
          value: '1000',
          valueType: 'custom',
        },
      },
    ],
  },
]

/**
 * 自定义事件
 */
//自定义事件列表
export const customEventList = [
  {
    value: 'register',
    label: '注册',
  },
  {
    value: 'initRefresh',
    label: '刷新用户注册',
  },
  {
    value: 'backPage',
    label: '返回上一页',
  },
  {
    value: 'closPop',
    label: '关闭弹窗',
  },
  {
    value: 'getThreeData',
    label: '获取三方数据',
  },
  {
    value: 'tips',
    label: '提示',
    showContent: true,
  },
  {
    value: 'makePhoneCall',
    label: '调用电话',
    showContent: true,
  },
  {
    value: 'getNetworkType',
    label: '获取网络类型',
  },
  {
    label: '其他',
    children: [
      {
        value: 'executeWait',
        label: '执行等待',
      },
      {
        value: 'showLoading',
        label: '加载中',
      },
      {
        value: 'hideLoading',
        label: '隐藏加载中',
      },
      {
        value: 'showShareMenu',
        label: '页面允许分享',
      },
      {
        value: 'hideShareMenu',
        label: '页面禁止分享',
      },
      {
        value: 'openLocation',
        label: '微信内置地图查看位置',
      },
      {
        value: 'exitMiniProgram',
        label: '退出小程序',
      },
    ],
  },
]

/**
 * 授权接口
 */
export const authEventList = [
  {
    value: 'getLocation',
    label: '授权地址',
    params: [
      {
        key: 'type',
        pageValue: {
          valueType: 'custom',
          value: 'wgs84',
        },
      },
    ],
  },
  {
    value: 'chooseAddress',
    label: '选择收货地址',
  },
  {
    value: 'chooseInvoiceTitle',
    label: '发票抬头',
  },
  {
    value: 'getWeRunData',
    label: '微信步数',
  },
  {
    value: 'chooseInvoice',
    label: '用户发票',
  },
  {
    value: 'saveImageToPhotosAlbum',
    label: '保存图片',
    params: [
      {
        key: 'filePath',
        pageValue: {
          valueType: 'custom',
        },
      },
    ],
  },
  {
    value: 'saveVideoToPhotosAlbum',
    label: '保存视频',
    params: [
      {
        key: 'filePath',
        pageValue: {
          valueType: 'custom',
        },
      },
    ],
  },
  {
    value: 'startLocationUpdate',
    label: '前台接收位置消息',
  },
  {
    value: 'chooseLocation',
    label: '地图选择位置',
  },
  {
    value: 'startLocationUpdateBackground',
    label: '前后后接收位置消息',
  },
  {
    value: 'startRecord',
    label: '录音',
  },
  {
    value: 'joinVoIPChat',
    label: '实时语音',
  },
  {
    value: 'camera',
    label: '摄像头',
  },
  {
    value: 'openBluetoothAdapter',
    label: '蓝牙初始化',
  },
  {
    value: 'createBLEPeripheralServer',
    label: '本地蓝牙',
  },
  {
    value: 'addPhoneContact',
    label: '添加联系人',
  },
  {
    value: 'addPhoneCalendar',
    label: '日历添加事件',
  },
  {
    value: 'addPhoneRepeatCalendar',
    label: '日历添加重复事件',
  },
  {
    value: 'RecorderManager',
    label: '录音管理器',
  },
]

/**
 * 公共组件动作列表
 */
export const moduleOperationList = [
  {
    label: '滚动到该组件',
    value: 'scroll',
    props: {
      placeholder: '滚动时长 单位毫秒（默认300毫秒）',
      min: 0,
    },
  },
  {
    label: '显示',
    value: 'show',
  },
  {
    label: '隐藏',
    value: 'hide',
  },
  {
    label: '显示/隐藏',
    value: 'show_hide',
  },
  {
    label: '动画效果',
    children: [
      {
        label: '动画',
        value: 'animate',
      },
      {
        label: '过渡',
        value: 'transition',
      },
    ],
  },
]

/**
 * 轮播组件动作列表
 */
export const moduleCarouselOperationList = [
  {
    label: '滚动到指定轮播',
    value: 'carousel_current',
    props: {
      placeholder: '0为第一张轮播以此类推',
      min: 0,
    },
  },
  {
    label: '向前',
    value: 'carousel_pre',
  },
  {
    label: '向后',
    value: 'carousel_next',
  },
]

/**
 * 视频组件动作列表
 */
export const moduleVideoOperationList = [
  {
    value: 'handle_video',
    label: '操作视频',
    children: [
      {
        value: 'open_muted',
        label: '开启静音',
      },
      {
        value: 'close_muted',
        label: '关闭静音',
      },
      {
        value: 'video_muted',
        label: '开启/关闭静音',
      },
      {
        value: 'open_loop',
        label: '开启循环播放',
      },
      {
        value: 'close_loop',
        label: '关闭循环播放',
      },
      {
        value: 'video_loop',
        label: '开启/关闭循环播放',
      },
      {
        value: 'video_play',
        label: '播放视频',
      },
      {
        value: 'video_pause',
        label: '暂停视频',
      },
      {
        value: 'request_full_screen',
        label: '全屏播放',
      },
      {
        value: 'exit_full_screen',
        label: '退出全屏',
      },
    ],
  },
]

/**
 * 抽奖组件的操作列表
 */
export const gridLotteryOperationList = [
  {
    value: 'lottery_start',
    label: '开始抽奖',
  },
  {
    value: 'lottery_stop',
    label: '结束抽奖',
  },
  {
    value: 'lottery_toggle',
    label: '开始/结束抽奖',
  },
]

/**
 * 需要额外的输入框的事件
 */
export const moduleOperationListKey = Object.fromEntries(
  [
    ...moduleOperationList,
    ...moduleCarouselOperationList,
    ...moduleVideoOperationList,
    ...gridLotteryOperationList,
  ].map((elem) => {
    return [elem.value, elem]
  }),
)

/**
 * 小程序跳转方式
 */
const jumpTypeList = [
  {
    value: 'navigateTo',
    label: 'navigateTo(保留当前页面)',
  },
  {
    value: 'redirectTo',
    label: 'redirectTo(关闭当前页面)',
  },
  {
    value: 'reLaunch',
    label: 'reLaunch(关闭所有页面)',
  },
]

/**
 * 跳转事件的列表
 */
export const moduleOperationListSelect = {
  page_jump: jumpTypeList,
  page_setting: jumpTypeList,
  jump_h5: jumpTypeList,
}
