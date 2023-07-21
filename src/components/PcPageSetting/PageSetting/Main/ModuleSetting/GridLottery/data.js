export default class {
  constructor() {
    //图片
    this.images = new Array(9).fill('')
    //活动id
    this.activityId = ''
    //转动规则，1-9
    this.order = '123654789'
    //块之间的间隔，单位rpx
    this.gap = 10
    //初始停留的图片序号
    this.current = 0
    //正常跳转间隔
    this.interval = 10
    //是否缓动停止
    this.stopEase = true
    //停止动画时长
    this.easeTiming = 2000
    //激活模块的样式
    this.activeItemStyle = {
      border: undefined,
      brightness: 1,
    }
    //未激活模块的样式
    this.defaultItemStyle = {
      border: undefined,
      brightness: 0.6,
    }
    //盲盒模式
    this.blindBoxMode = false
    //盒子抬起高度
    this.liftHeight = 60
  }
}

export const formListFn = (imgCount) => {
  return [
    {
      type: 'el-input',
      field: 'activityId',
      title: '活动id',
    },
    {
      type: 'el-switch',
      field: 'blindBoxMode',
      title: '盲盒模式',
      props: {
        activeText: '是',
        inactiveText: '否',
      },
      update(val, rules) {
        //console.log(val, rules);
        imgCount.value = val ? 6 : 9
      },
      control: [
        {
          handle(val) {
            return val
          },
          formList: [
            {
              type: 'el-input',
              field: 'liftHeight',
              title: '盒子抬起高度',
            },
          ],
        },
        {
          handle(val) {
            return !val
          },
          formList: [
            {
              type: 'el-input',
              field: 'order',
              title: '转动规则,1-9',
            },
            {
              type: 'el-input',
              field: 'gap',
              title: '块之间的间隔',
            },
            {
              type: 'el-input',
              field: 'current',
              title: '初始停留的图片序号',
            },
            {
              type: 'el-input',
              field: 'interval',
              title: '跳转间隔',
            },
            {
              type: 'el-switch',
              field: 'stopEase',
              title: '是否缓动停止',
            },
            {
              type: 'el-input',
              field: 'easeTiming',
              title: '停止动画时长',
            },
            {
              type: 'object',
              field: 'defaultItemStyle',
              formList: [
                {
                  type: 'el-input',
                  field: 'border',
                  title: '默认小方块边框',
                },
                {
                  type: 'el-slider',
                  field: 'brightness',
                  title: '默认小方块亮度',
                  defaultValue: 0.6,
                  props: {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    'show-input': true,
                    'show-stops': true,
                  },
                },
              ],
            },
            {
              type: 'object',
              field: 'activeItemStyle',
              formList: [
                {
                  type: 'el-input',
                  field: 'border',
                  title: '默认小方块边框',
                },
                {
                  type: 'el-slider',
                  field: 'brightness',
                  title: '默认小方块亮度',
                  defaultValue: 1,
                  props: {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    'show-input': true,
                    'show-stops': true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
