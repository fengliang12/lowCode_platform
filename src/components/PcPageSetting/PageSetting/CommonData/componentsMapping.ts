//组件映射
export default {
  common: {
    name: '组', //名称
    isParent: true, //能否为父元素
    followChildHeight: true, //跟随子元素高度变化
    icon: 'Folder',
  },
  carousel: {
    name: '轮播',
    isParent: true,
    followChildHeight: true,
    icon: 'Switch',
  },
  indicator: {
    name: '指示点',
    isParent: false,
    icon: 'MoreFilled',
  },
  hot: {
    name: '图片',
    isParent: false,
    icon: 'Picture',
  },
  scrollView: {
    name: '滚动条',
    isParent: true,
    icon: 'Film',
  },
  progress: {
    name: '进度条',
    isParent: true,
    icon: 'SemiSelect',
  },
  text: {
    name: '文本',
    isParent: false,
    icon: 'Document',
  },
  hotView: {
    name: '热区',
    isParent: false,
    unComponents: true,
    icon: 'FullScreen',
  },
  slot: {
    name: '插槽',
    isParent: false,
    icon: 'Connection',
  },
  weChatButton: {
    name: '微信按钮',
    icon: 'SwitchButton',
    isParent: false,
  },
  qrCode: {
    name: '二维码',
    icon: 'Menu',
    isParent: false,
    initData: {
      width: 200,
      height: 200,
    },
  },
  gridLottery: {
    name: '九宫格抽奖',
    isParent: false,
    icon: 'Grid',
    initData: {
      width: 600,
      height: 600,
    },
  },
  movableArea: {
    name: '拖拽区域',
    icon: 'Crop',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  movableView: {
    name: '拖拽容器',
    isParent: true,
    icon: 'Grid',
    initData: {
      width: 100,
      height: 100,
    },
  },
  richText: {
    name: '富文本',
    icon: 'Postcard',
    isParent: false,
    initData: {
      width: 750,
      height: 300,
    },
  },

  sticky: {
    name: '吸附',
    icon: 'Ticket',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  shareElement: {
    name: '共享元素',
    icon: 'Share',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  pageContainer: {
    name: '页面容器',
    icon: 'Reading',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  countDown: {
    name: '倒计时',
    icon: 'Odometer',
    isParent: true,
  },
  form: {
    name: '表单',
    icon: 'EditPen',
    isParent: false,
  },
  painter: {
    name: '海报',
    icon: 'EditPen',
    isParent: true,
  },
}
