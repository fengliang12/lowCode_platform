//动画选项表达
export const transitionComponentsList = [
  {
    field: 'transitionDelay',
    type: 'el-input-number',
    title: '延迟(s)',
  },
  {
    field: 'transitionDuration',
    type: 'el-input-number',
    title: '持续时间(s)',
  },
  {
    field: 'transitionDirection',
    type: 'el-select',
    title: '播放方向',
    options: [
      {
        value: 'normal',
        label: '正常',
      },
      {
        value: 'alternate',
        label: '反向',
      },
    ],
  },
  {
    field: 'transitionFunction',
    type: 'el-select',
    title: '速度曲线',
    options: [
      {
        value: 'ease',
        label: '动画以低速开始，然后加快，在结束前变慢(默认)',
      },
      {
        value: 'linear',
        label: '从头到尾的速度是相同的',
      },
      {
        value: 'ease-in',
        label: '以低速开始',
      },
      {
        value: 'ease-out',
        label: '以低速结束',
      },
      {
        value: 'ease-in-out',
        label: '以低速开始和结束',
      },
    ],
  },
  {
    field: 'width',
    type: 'el-input-number',
    title: '宽度',
  },
  {
    field: 'height',
    type: 'el-input-number',
    title: '高度',
  },
  {
    field: 'marginLeft',
    type: 'el-input-number',
    title: '左距',
  },
  {
    field: 'marginTop',
    type: 'el-input-number',
    title: '上距',
  },
  {
    field: 'marginRight',
    type: 'el-input-number',
    title: '右距',
  },
  {
    field: 'marginBottom',
    type: 'el-input-number',
    title: '底距',
  },
]
//动画选项默认值
export const transitionDefault = {
  transitionDelay: 0,
  transitionDuration: 1,
  transitionDirection: 'normal',
  transitionFunction: 'ease',
}
