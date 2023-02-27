export default class {
  constructor() {
    //自动播放
    this.autoplay = false
    //轮播类型
    this.carouselType = 'fullScreen'
    //是否循环轮播
    this.circular = false
    //初始化显示滑块位置
    this.current = 0
    //同时显示滑块数量
    this.displayMultipleIItems = 1
    //轮播切换动画时长
    this.duration = 1000
    //滑块切换动画
    this.easingFunction = 'default'
    //选中点样式
    this.indicatorActiveColor = 'rgba(0, 0, 0, 1)'
    //默认点颜色
    this.indicatorColor = 'rgba(0, 0, 0, 0.3)'
    //轮播时间间隔
    this.interval = 3000
    //同步设置不提交接口
    this.syncSettings = true
    //后边距
    this.nextMargin = 0
    //前边距
    this.previousMargin = 0
    //指示点样式   default 默认  flat扁平
    this.pointStyle = 'default'

    //关联其他轮播组件
    this.relationSwiper = []
    //是否展示轮播点
    this.showPoint = false
    // 滚动方向滑动方向是否为纵向
    this.vertical = false
    // 未显示的轮播缩小倍数
    this.zoomOut = 1
    // 是否叠加显示
    this.overlap = false
    // 叠加显示内容间距
    this.spacing = 0
  }
}
