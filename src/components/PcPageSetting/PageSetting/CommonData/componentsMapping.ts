//组件映射
export default {
  common: {
    name: '组', //名称
    isParent: true, //能否为父元素
    followChildHeight: true, //跟随子元素高度变化
  },
  carousel: {
    name: '轮播',
    isParent: true,
    followChildHeight: true,
  },
  indicator: {
    name: '指示点',
    isParent: false,
  },
  hot: {
    name: '图片',
    isParent: false,
  },
  scrollView: {
    name: '滚动条',
    isParent: true,
  },
  progress: {
    name: '进度条',
    isParent: true,
  },
  text: {
    name: '文本',
    isParent: false,
  },
  hotView: {
    name: '热区',
    isParent: false,
    unComponents: true,
  },
  slot: {
    name: '插槽',
    isParent: false,
  },
  weChatButton: {
    name: '微信按钮',
    isParent: false,
  },
  qrCode: {
    name: '二维码',
    isParent: false,
    initData: {
      width: 200,
      height: 200,
    },
  },
  gridLottery: {
    name: '九宫格抽奖',
    isParent: false,
    initData: {
      width: 600,
      height: 600,
    },
  },
  movableArea: {
    name: '拖拽区域',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  movableView: {
    name: '拖拽容器',
    isParent: true,
    initData: {
      width: 100,
      height: 100,
    },
  },
  richText: {
    name: '富文本',
    isParent: false,
    initData: {
      width: 750,
      height: 300,
    },
  },

  sticky: {
    name: '吸附',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  shareElement: {
    name: '共享元素',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  pageContainer: {
    name: '页面容器',
    isParent: true,
    initData: {
      width: 750,
      height: 300,
    },
  },
  countDown: {
    name: '倒计时',
    isParent: true,
  },
  form: {
    name: '表单',
    isParent: false,
  },
}
