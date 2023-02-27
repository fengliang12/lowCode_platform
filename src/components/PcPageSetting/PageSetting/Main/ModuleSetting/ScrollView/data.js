export default class ScrollViewData {
  constructor() {
    this.direction = 'scroll-x' //滚动方向
    this.upperThreshold = 50 //距顶部/左边多远时，触发 scrolltoupper 事件
    this.lowerThreshold = 50 //距底部/右边多远时，触发 scrolltolower 事件
    this.scrollTop = 0 //竖向滚动条位置
    this.scrollLeft = 0 //横向滚动条位置
    this.scrollIntoView = '' //值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
    this.scrollWithAnimation = true //在设置滚动条位置时使用动画过渡
    this.enableBlackToTop = false //iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向。自 2.27.3 版本开始，若非显式设置为 false，则在显示尺寸大于屏幕 90% 时自动开启。
    this.enableFlex = false //启用 flexbox 布局。开启后，当前节点声明了 `display: flex` 就会成为 flex container，并作用于其孩子节点。
    this.scrollAnchoring = false //开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效，安卓下可参考 CSS `overflow-anchor` 属性。
    this.refresherEnabled = false //自定义下拉刷新
    this.refresherThreshold = 45 //自定义下拉刷新阈值
    this.refresherDefaultStyle = 'black' //自定义下拉刷新默认样式
    this.refresherBackground = '#ffffff' //下拉刷新区域背景颜色
    this.refresherTriggered = false //下拉刷新状态
    this.enhanced = true //增强特性
    this.bounces = true //边界弹性控制
    this.showScrollbar = true //滚动条显隐控制
    this.pagingEnabled = false //分页滑动效果
    this.fastDeceleration = false //滑动减速速率控制
  }
}

export const formList = (children) => {
  return [
    {
      type: 'el-select',
      field: 'direction',
      title: '滚动方向',
      options: [
        {
          label: '横向滚动',
          value: 'scroll-x'
        },
        {
          label: '竖向滚动',
          value: 'scroll-y'
        }
      ]
    },
    {
      type: 'el-input-number',
      field: 'scrollTop',
      title: '竖向滚动条位置:',
      props: {
        placeholder: '请输入'
      }
    },
    {
      type: 'el-input-number',
      field: 'scrollLeft',
      title: '横向滚动条位置:',
      props: {
        placeholder: '请输入'
      }
    },
    {
      type: 'el-select',
      field: 'scrollIntoView',
      title: '滚动到该元素',
      options: [],
      effect: {
        fetch: () => {
          return new Promise((resolve) => {
            console.log('children', children)
            resolve(
              children.map((item) => ({ label: item.title, value: item.code }))
            )
          })
        },
        to: 'options'
      }
    },
    {
      type: 'el-switch',
      field: 'scrollWithAnimation',
      title: '动画过渡'
    },
    {
      type: 'el-switch',
      field: 'enableBlackToTop',
      title: '返回顶部'
    },
    {
      type: 'el-switch',
      field: 'enableFlex',
      title: '开启flex'
    },
    {
      type: 'el-switch',
      field: 'scrollAnchoring',
      title: '滚动特性',
      tips: '仅在 iOS 下生效'
    },
    {
      type: 'el-switch',
      field: 'enhanced',
      title: '增强特性',
      tips: 'enhanced'
    },
    {
      type: 'el-switch',
      field: 'bounces',
      title: '边界弹性控制',
      tips: 'iOS下scroll-view 边界弹性控制 (同时开启 enhanced 属性后生效)'
    },
    {
      type: 'el-switch',
      field: 'showScrollbar',
      title: '滚动条显隐控制',
      tips: '同时开启 enhanced 属性后生效'
    },
    {
      type: 'el-switch',
      field: 'pagingEnabled',
      title: '分页滑动效果',
      tips: '同时开启 enhanced 属性后生效'
    },
    {
      type: 'el-switch',
      field: 'fastDeceleration',
      title: '滑动减速速率控制',
      tips: '同时开启 enhanced 属性后生效'
    }
  ]
}
