
export default class {
  constructor() {
    this.overlay = true; //遮罩层
    this.position = "bottom"; //弹出位置，可选值为 top bottom right center
    this.round = false; //是否显示圆角
    this.closeOnSlideDown = false; //是否在下滑一段距离后关闭
    this.zIndex = 100; //层级
    this.duration = 300; //动画时长，单位毫秒
    this.overlayStyle = ""; //自定义遮罩层样式
    this.customStyle = ""; //自定义弹出层样式
  }
}

export const formListFn = function () {
  return [
    {
      type: "el-switch",
      field: 'overlay',
      title: '遮罩层',
      defaultValue: true,
    },
    {
      type: 'el-select',
      field: 'position',
      title: '弹出位置',
      defaultValue: 'bottom',
      options: [
        {
          label: "上",
          value: "top",
        },
        {
          label: "下",
          value: "bottom",
        },
        {
          label: "左",
          value: "left",
        },
        {
          label: "右",
          value: "right",
        },

      ]
    },
    {
      type: "el-switch",
      field: 'round',
      title: '是否显示圆角',
      defaultValue: false,
    },
    {
      type: "el-switch",
      field: 'closeOnSlideDown',
      title: '是否在下滑一段距离后关闭',
      defaultValue: false,
    },
    {
      type: 'el-input-number',
      field: 'zIndex',
      title: '层级',
      defaultValue: 100
    },
    {
      type: 'el-input-number',
      field: 'duration',
      title: '动画时长，单位毫秒',
      defaultValue: 300
    },
    {
      type: 'el-input',
      field: 'overlayStyle',
      title: '自定义遮罩层样式'
    },
    {
      type: 'el-input',
      field: 'customStyle',
      title: '自定义弹出层样式'
    },
  ]
}