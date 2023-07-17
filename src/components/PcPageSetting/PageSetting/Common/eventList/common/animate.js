//动画
export const animateList = [
  {
    value: 'custom',
    label: '自定义',
    child: [
      {
        value: 'animate__marquee',
        label: '跑马灯',
        params: {
          animationIterationCount: 'infinite',
          animationDuration: 5,
          animationTimingFunction: 'linear',
        },
      },
    ],
  },
  {
    value: 'attentionSeekers',
    label: '引人关注的',
    child: [
      {
        value: 'animate__bounce',
        label: '弹跳',
      },
      {
        value: 'animate__flash',
        label: '闪光',
      },
      {
        value: 'animate__pulse',
        label: '脉冲',
      },
      {
        value: 'animate__rubberBand',
        label: '橡皮筋',
      },
    ],
  },
  {
    value: 'zoomingEntrances',
    label: '放大进入',
    child: [
      {
        value: 'animate__zoomIn',
        label: '放大',
      },
      {
        value: 'animate__zoomInDown',
        label: '放大缩小',
      },
      {
        value: 'animate__zoomInLeft',
        label: '向左放大',
      },
      {
        value: 'animate__zoomInRight',
        label: '右放大',
      },
      {
        value: 'animate__zoomOutUp',
        label: '向上放大',
      },
    ],
  },
  {
    value: 'slidingEntrances',
    label: '滑动动画',
    child: [
      {
        value: 'animate__slideInDown',
        label: '向下滑动',
      },
      {
        value: 'animate__slideInLeft',
        label: '向左滑动',
      },
      {
        value: 'animate__slideInRight',
        label: '向右滑动',
      },
      {
        value: 'animate__slideInUp',
        label: '上滑',
      },
    ],
  },
  {
    value: 'slidingExits',
    label: '滑出动画',
    child: [
      {
        value: 'animate__slideOutDown',
        label: '向下滑出',
      },
      {
        value: 'animate__slideOutLeft',
        label: '向左滑出',
      },
      {
        value: 'animate__slideOutRight',
        label: '向右滑动',
      },
      {
        value: 'animate__slideOutUp',
        label: '向上滑出',
      },
    ],
  },
  {
    value: 'fadingEntrances',
    label: '淡入动画',
    child: [
      {
        value: 'animate__fadeIn',
        label: '淡入',
      },
      {
        value: 'animate__fadeInDown',
        label: '淡入淡出',
      },

      {
        value: 'animate__fadeInDownBig',
        label: '淡入淡出大',
      },
      {
        value: 'animate__fadeInLeft',
        label: '向左淡入',
      },
      {
        value: 'animate__fadeInLeftBig',
        label: '淡入左大',
      },
      {
        value: 'animate__fadeInRight',
        label: '向右淡入',
      },
      {
        value: 'animate__fadeInRightBig',
        label: '淡入右大',
      },
      {
        value: 'animate__fadeInUp',
        label: '淡入向上',
      },
      {
        value: 'animate__fadeInUpBig',
        label: '淡入向上大',
      },
      {
        value: 'animate__fadeInTopLeft',
        label: '淡入左上',
      },
      {
        value: 'animate__fadeInTopRight',
        label: '右上淡入淡出',
      },
      {
        value: 'animate__fadeInBottomLeft',
        label: '淡入左下',
      },
      {
        value: 'animate__fadeInBottomRight',
        label: '淡入右下',
      },
    ],
  },
  {
    value: 'fadingExits',
    label: '淡出动画',
    child: [
      {
        value: 'animate__fadeOut',
        label: '消退',
      },
      {
        value: 'animate__fadeOutDown',
        label: '淡出淡出',
      },
      {
        value: 'animate__fadeOutDownBig',
        label: '淡出淡出大',
      },
      {
        value: 'animate__fadeOutLeft',
        label: '淡出左',
      },
      {
        value: 'animate__fadeOutLeftBig',
        label: '淡出左大',
      },
      {
        value: 'animate__fadeOutRight',
        label: '淡出右移',
      },
      {
        value: 'animate__fadeOutUp',
        label: '淡出向上',
      },
      {
        value: 'animate__fadeOutUpBig',
        label: '淡出向上大',
      },
      {
        value: 'animate__fadeOutTopLeft',
        label: '淡出左上',
      },
      {
        value: 'animate__fadeOutTopRight',
        label: '淡出右上角',
      },
      {
        value: 'animate__fadeOutBottomRight',
        label: '淡出右下',
      },
      {
        value: 'animate__fadeOutBottomLeft',
        label: '淡出左下',
      },
    ],
  },
  {
    value: 'rotatingEntrances',
    label: '旋转入口',
    child: [
      {
        value: 'animate__rotateIn',
        label: '旋转进入',
      },
      {
        value: 'animate__rotateInDownLeft',
        label: '左下旋入',
      },
      {
        value: 'animate__rotateInDownRight',
        label: '右下旋入',
      },
      {
        value: 'animate__rotateInUpLeft',
        label: '左上旋入',
      },
      {
        value: 'animate__rotateInUpRight',
        label: '右上旋入',
      },
    ],
  },
  {
    value: 'rotatingExits',
    label: '旋转出口',
    child: [
      {
        value: 'animate__rotateOut',
        label: '旋转出',
      },
      {
        value: 'animate__rotateOutDownLeft',
        label: '左下旋出',
      },
      {
        value: 'animate__rotateOutDownRight',
        label: '右下旋出',
      },
      {
        value: 'animate__rotateOutUpLeft',
        label: '左上旋出',
      },
      {
        value: 'animate__rotateOutUpRight',
        label: '右上旋出',
      },
    ],
  },
  {
    value: 'bouncingEntrances',
    label: '弹跳入口',
    child: [
      {
        value: 'animate__bounceIn',
        label: '弹跳',
      },
      {
        value: 'animate__bounceInDown',
        label: '弹跳向下',
      },
      {
        value: 'animate__bounceInLeft',
        label: '向左反弹',
      },
      {
        value: 'animate__bounceInRight',
        label: '右弹跳',
      },
      {
        value: 'animate__bounceInUp',
        label: '反弹',
      },
    ],
  },
  {
    value: 'backEntrances',
    label: '后门',
    child: [
      {
        value: 'animate__backInDown',
        label: '后退',
      },
      {
        value: 'animate__backInLeft',
        label: '后退左',
      },
      {
        value: 'animate__backInRight',
        label: '后右',
      },
      {
        value: 'animate__backInUp',
        label: '备份',
      },
    ],
  },
]

//动画选项表达
export const animationComponentsList = [
  {
    field: 'animationDelay',
    type: 'el-input-number',
    title: '延迟(s)',
  },
  {
    field: 'animationDuration',
    type: 'el-input-number',
    title: '持续时间(s)',
  },
  {
    field: 'animationIterationCount',
    type: 'el-input-number',
    title: '重复次数',
    props: {
      placeholder: '定义动画播放次数的数值',
    },
    tips: '(infinite) 表示无限播放',
  },
  {
    field: 'repeatedPromotion',
    type: 'el-switch',
    title: '重复触发',
    tips: '动画可触发多次',
  },
  {
    field: 'animationDirection',
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
    field: 'animationTimingFunction',
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
]
//动画选项默认值
export const animationDefault = {
  animationDelay: 0,
  animationDuration: 1,
  animationIterationCount: 1,
  animationDirection: 'normal',
  repeatedPromotion: false,
  animationTimingFunction: '',
}
