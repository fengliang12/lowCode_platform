export default class ProgressData {
  constructor() {
    //百分比
    this.percent = null
    //右侧文案
    this.showInfo = false
    //圆角
    this.borderRadius = 0
    //字体大小
    this.fontSize = 16
    //进度条宽度
    this.strokeWidth = 6
    //进度条颜色
    this.activeColor = '#09BB07'
    //进度条未选中颜色
    this.backgroundColor = '#EBEBEB'
    //动画
    this.active = false
    //动画时间
    this.duration = 30
  }
}

export const formList = [
  {
    type: 'el-input',
    field: 'percent',
    title: '进度',
    props: {
      max: 100
    },
    tips: '填写后填写为准动态数据失效'
  },
  {
    type: 'el-switch',
    field: 'active',
    title: '动画'
  },
  {
    type: 'el-switch',
    field: 'showInfo',
    title: '左右文案'
  },
  {
    type: 'el-input-number',
    field: 'duration',
    title: '动画时间'
  },
  {
    type: 'el-input-number',
    field: 'duration',
    title: '动画时间'
  },
  {
    type: 'el-input-number',
    field: 'strokeWidth',
    title: '宽度',
    props: {
      disabled: true
    },
    tips: '本数据只用于显示,跟随组件样式中高度变化'
  },
  {
    type: 'el-input-number',
    field: 'borderRadius',
    title: '圆角',
    props: {
      disabled: true
    },
    tips: '本数据只用于显示,跟随组件样式中圆角变化'
  },
  {
    type: 'el-input-number',
    field: 'fontSize',
    title: '右侧字体大小'
  },
  {
    type: 'el-color-picker',
    field: 'activeColor',
    title: '已选择颜色'
  },
  {
    type: 'el-color-picker',
    field: 'backgroundColor',
    title: '未选择颜色'
  }
]
