export default class MovableAreaData {
  constructor() {
    this.scaleArea = false //	当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area
    this.clickMove = false //点击移动
  }
}

export const formList = () => {
  return [
    {
      type: 'el-switch',
      field: 'clickMove',
      title: '点击移动',
    },
    {
      type: 'el-switch',
      field: 'scaleArea',
      title: '双指缩放',
      tips: '当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area',
    },
  ]
}
