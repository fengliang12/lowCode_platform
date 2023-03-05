export default class {
  constructor() {
    //是否显示
    this.show = true
    //能否返回
    this.back = true
    //导航title
    this.title = null
    //导航背景
    this.backgroundImage = null
    //导航标题色
    this.titleColor = null
    //导航背景色
    this.backgroundColor = null
    //title图
    this.titleImage = null
    //是否填充
    this.fill = true
    //状态栏颜色
    this.statusBarColor = null
    //滚动显示背景
    this.backgroundColorOpacity = null
    this.backgroundColorOpacityDistance = null
  }
}

export const componentsList = () => {
  return [
    {
      divider: '自定义导航',
      filed: 'show',
      type: 'el-switch',
      title: '显示标题栏',
    },
    {
      filed: 'back',
      type: 'el-switch',
      title: '是否返回',
    },
    {
      filed: 'title',
      type: 'el-input',
      title: '标题',
    },
    {
      filed: 'titleColor',
      type: 'el-color-picker',
      title: '标题颜色',
      props: {
        'show-alpha': true,
      },
    },
    {
      filed: 'titleImage',
      type: 'upload-file',
      title: '标题图片',
    },
    {
      filed: 'backgroundColor',
      type: 'el-color-picker',
      title: '导航背景色',
      props: {
        'show-alpha': true,
      },
    },
    {
      filed: 'backgroundImage',
      type: 'upload-file',
      title: '导航背景图',
    },
    {
      filed: 'fill',
      type: 'el-switch',
      title: '是否填充',
    },
    {
      filed: 'statusBarColor',
      type: 'el-select',
      title: '状态栏颜色',
      props: {
        clearable: true,
        placeholder: '请选择',
      },
      options: [
        {
          value: '#000000',
          label: '黑色',
        },
        {
          value: '#ffffff',
          label: '白色',
        },
      ],
    },
    {
      filed: 'backgroundColorOpacity',
      type: 'el-switch',
      title: '滚动背景渐变',
    },
    {
      filed: 'backgroundColorOpacityDistance',
      type: 'el-input',
      title: '滚动渐变距离',
    },
  ]
}
