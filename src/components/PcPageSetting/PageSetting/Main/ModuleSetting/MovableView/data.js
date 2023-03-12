export default class MovableViewData {
  constructor() {
    this.relationSwiper = '' //关联轮播
    this.direction = 'none' //移动方向 属性值有all、vertical、horizontal、none
    this.inertia = true //movable-view是否带有惯性
    this.x = 0 //x轴方向的偏移
    this.y = 0 //定义 y 轴方向的偏移
    this.damping = 20 //阻尼系数,用于控制 x 或y改变时的动画和过界回弹的动画,值越大移动越快
    this.friction = 2 //摩擦系数,用于控制惯性滑动的动画,值越大摩擦力越大,滑动越快停止；必须大于0,否则会被设置成默认值
    this.disabled = false //是否禁用
    this.scale = false //是否支持双指缩放,默认缩放手势生效区域是在 movable-view 内
    this.scaleMin = 0.5 // 定义缩放倍数最小值
    this.scaleMax = 10 // 定义缩放倍数最大值
    this.scaleValue = 1 // 定义缩放倍数,取值范围为 0.5 - 10
    this.animation = true // 是否使用动画
  }
}

export const formList = (itemsMap) => {
  return [
    {
      field: 'relationSwiper',
      title: '关联轮播',
      type: 'el-select',
      options: [],
      effect: {
        fetch: () => {
          return new Promise((resolve) => {
            console.log('itemsMap', itemsMap.values);
            let tempList = itemsMap?.values
              ? Array.from(itemsMap.values()).filter((elem) => {
                if (elem.moduleType === 'carousel') {
                  return elem
                }
              }).map(item => ({
                label: item.title,
                value: item.code,
              }))
              : []
            console.log('tempList', tempList);
            resolve(tempList)
          })
        },
        to: 'options',
      },
    },
    {
      field: 'direction',
      title: '移动方向',
      type: 'el-select',
      options: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '纵向移动',
          value: 'vertical',
        },
        {
          label: '横向移动',
          value: 'horizontal',
        },
        {
          label: '禁止移动',
          value: 'none',
        },
      ],
    },
    {
      type: 'el-switch',
      field: 'inertia',
      title: '是否带有惯性',
    },
    {
      type: 'el-input-number',
      field: 'x',
      title: 'x轴方向的偏移',
    },
    {
      type: 'el-input-number',
      field: 'y',
      title: 'y轴方向的偏移',
    },
    {
      type: 'el-input-number',
      field: 'damping',
      title: '阻尼系数',
      tips: '用于控制 x 或y改变时的动画和过界回弹的动画,值越大移动越快',
    },
    {
      type: 'el-input-number',
      field: 'friction',
      title: '摩擦系数',
      tips: '用于控制惯性滑动的动画,值越大摩擦力越大,滑动越快停止,必须大于0,否则会被设置成默认值',
    },
    {
      type: 'el-switch',
      field: 'disabled',
      title: '是否禁用',
    },
    {
      type: 'el-switch',
      field: 'scale',
      title: '是否支持双指缩放',
      tips: '默认缩放手势生效区域是在 movable-view 内',
    },
    {
      type: 'el-input-number',
      field: 'scaleMin',
      title: '缩放倍数最小值',
    },
    {
      type: 'el-input-number',
      field: 'scaleMax',
      title: '缩放倍数最大值',
    },
    {
      type: 'el-input-number',
      field: 'scaleValue',
      title: '缩放倍数',
      props: {
        max: 10,
        min: 0.5,
      },
    },
    {
      type: 'el-switch',
      field: 'animation',
      title: '是否使用动画',
    },
  ]
}
