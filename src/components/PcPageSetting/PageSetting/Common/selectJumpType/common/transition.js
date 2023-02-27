//动画选项表达
export const transitionComponentsList = [
  {
    key: 'transitionDelay',
    component: 'el-input-number',
    label: '延迟(s)'
  },
  {
    key: 'transitionDuration',
    component: 'el-input-number',
    label: '持续时间(s)'
  },
  {
    key: 'transitionDirection',
    component: 'el-select',
    label: '播放方向',
    child: [
      {
        component: 'el-option',
        optionList: [
          {
            value: 'normal',
            label: '正常'
          },
          {
            value: 'alternate',
            label: '反向'
          }
        ]
      }
    ]
  },
  {
    key: 'transitionFunction',
    component: 'el-select',
    label: '速度曲线',
    child: [
      {
        component: 'el-option',
        optionList: [
          {
            value: 'ease',
            label: '动画以低速开始，然后加快，在结束前变慢(默认)'
          },
          {
            value: 'linear',
            label: '从头到尾的速度是相同的'
          },
          {
            value: 'ease-in',
            label: '以低速开始'
          },
          {
            value: 'ease-out',
            label: '以低速结束'
          },
          {
            value: 'ease-in-out',
            label: '以低速开始和结束'
          }
        ]
      }
    ]
  },
  {
    key: 'width',
    component: 'el-input',
    label: '宽度'
  },
  {
    key: 'height',
    component: 'el-input',
    label: '高度'
  },
  {
    key: 'marginLeft',
    component: 'el-input',
    label: '左距'
  },
  {
    key: 'marginTop',
    component: 'el-input',
    label: '上距'
  },
  {
    key: 'marginRight',
    component: 'el-input',
    label: '右距'
  },
  {
    key: 'marginBottom',
    component: 'el-input',
    label: '底距'
  }
]
//动画选项默认值
export const transitionDefault = {
  transitionDelay: 0,
  transitionDuration: 1,
  transitionDirection: 'normal',
  transitionFunction: 'ease'
}
