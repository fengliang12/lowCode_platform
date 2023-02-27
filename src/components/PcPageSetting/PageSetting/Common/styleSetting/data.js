import { floor } from 'lodash-es'
export class styleSettingData {
  constructor({
    width = 750,
    height = 200,
    position = 'relative',
    left = 0,
    top = 0,
    background = true,
    front = true,
    flex = true,
    box = true
  } = {}) {
    // 背景
    if (background) {
      this.backgroundColor = null
      this.backgroundImage = null
      this.backgroundRepeat = null
      this.backgroundSize = '100%'
    }
    // 字体
    if (front) {
      this.frontSize = 28
      this.fontWeight = null
      this.color = null
    }

    //文本位置
    if (flex) {
      this.justifyContent = null
      this.alignItems = null
      this.flexDirection = null
    }

    if (box) {
      //盒子设置
      this.position = position
      this.left = left
      this.top = top
      this.zIndex = 0
      this.right = null
      this.bottom = null
      this.width = width
      this.height = height
      this.borderRadius = 0
      this.hideAutoRatio = null
    }
    //自定义用于特殊情况
    this.custom = null
  }
}

/**
 * 表单选择
 * @param {*} param0
 * @returns
 */
export const formList = ({ ratio = 1, value }) => {
  console.log('ratio', ratio)
  return {
    backgroundList: [
      //背景图片
      {
        divider: '背景',
        key: 'backgroundImage',
        component: 'upload-file',
        label: '背景图片'
      },
      //背景颜色
      {
        key: 'backgroundColor',
        component: 'el-color-picker',
        label: '背景颜色',
        props: {
          'show-alpha': true
        }
      },
      {
        key: 'backgroundRepeat',
        component: 'el-select',
        label: '背景是否重复',
        props: {
          placeholder: '请选择'
        },
        child: [
          {
            component: 'el-option',
            optionList: [
              {
                label: '不重复(no-repeat)',
                value: 'no-repeat'
              },
              {
                label: '垂直和水平方向重复(repeat)',
                value: 'repeat'
              },
              {
                label: '水平重复(repeat-x)',
                value: 'repeat-x'
              },
              {
                label: '垂直重复(repeat-y)',
                value: 'repeat-y'
              },
              {
                label: '父元素继承(inherit)',
                value: 'inherit'
              }
            ]
          }
        ]
      },
      {
        key: 'backgroundSize',
        component: 'el-input',
        label: '背景大小'
      }
    ],
    //文字配置
    fontList: [
      {
        divider: '字体',
        key: 'color',
        component: 'el-color-picker',
        label: '字体颜色',
        props: {
          'show-alpha': true
        }
      },
      {
        key: 'fontSize',
        component: 'el-input-number',
        label: '字体大小'
      },
      {
        key: 'fontWeight',
        component: 'el-select',
        label: '字体粗细',
        child: [
          {
            component: 'el-option',
            optionList: [
              {
                label: '默认值(normal)',
                value: 'normal'
              },
              {
                label: '粗体(bold)',
                value: 'bold'
              },
              {
                label: '更粗(bolder)',
                value: 'bolder'
              },
              {
                label: '更细(lighter)',
                value: 'lighter'
              },
              {
                label: '100',
                value: '100'
              },
              {
                label: '200',
                value: '200'
              },
              {
                label: '300',
                value: '300'
              },
              {
                label: '400(同于 normal)',
                value: '400'
              },
              {
                label: '500',
                value: '500'
              },
              {
                label: '600',
                value: '600'
              },
              {
                label: '700( 等同于 bold)',
                value: '700'
              },
              {
                label: '800',
                value: '800'
              },
              {
                label: '900',
                value: '900'
              }
            ]
          }
        ]
      }
    ],
    //位置配置
    boxList: [
      {
        divider: '位置',
        key: 'position',
        component: 'el-select',
        label: '定位',
        on: {
          change: (val) => {
            if (val !== 'relative') {
              value.zIndex = 10
            }
          }
        },
        child: [
          {
            component: 'el-option',
            optionList: [
              {
                //兼容老版本处理 relative 和 static状态交换
                label: '静态定位(默认)',
                value: 'relative'
              },
              {
                label: '相对定位',
                value: 'static'
              },
              {
                label: '绝对定位',
                value: 'absolute'
              },
              {
                label: '固定定位',
                value: 'fixed'
              },
              {
                label: '粘性定位',
                value: 'sticky'
              }
            ]
          }
        ]
      },
      {
        key: 'zIndex',
        component: 'el-input-number',
        label: '层级'
      },
      {
        key: 'left',
        component: 'el-input',
        label: '左距',
        props: {
          clearable: true,
          type: 'number'
        },
        on: {}
      },
      {
        key: 'top',
        component: 'el-input',
        label: '上距',
        props: {
          clearable: true,
          type: 'number'
        },
        on: {}
      },
      {
        key: 'right',
        component: 'el-input',
        label: '右距',
        props: {
          clearable: true,
          type: 'number'
        }
      },
      {
        key: 'bottom',
        component: 'el-input',
        label: '底距',
        props: {
          clearable: true,
          type: 'number'
        }
      },
      {
        divider: '盒子',
        key: 'width',
        component: 'el-input-number',
        label: '宽度',
        button: '',
        btnClick: () => {
          console.log(ratio)
          value.width = floor(Number(value.height) * ratio, 2)
        }
      },
      {
        key: 'height',
        component: 'el-input-number',
        label: '高度',
        button: '',
        btnClick: () => {
          console.log(ratio)
          value.height = floor(Number(value.width) / ratio, 2)
        }
      },
      {
        key: 'borderRadius',
        component: 'el-input-number',
        label: '圆角'
      }
    ],
    //内容位置
    flexList: [
      {
        divider: '内容位置',
        key: 'justifyContent',
        component: 'el-select',
        label: '水平方向',
        child: [
          {
            component: 'el-option',
            optionList: [
              {
                label: '居左',
                value: 'flex-start'
              },
              {
                label: '居右',
                value: 'flex-end'
              },
              {
                label: '水平居中',
                value: 'center'
              }
            ]
          }
        ]
      },
      {
        key: 'alignItems',
        component: 'el-select',
        label: '竖直方向',
        child: [
          {
            component: 'el-option',
            optionList: [
              {
                label: '顶部',
                value: 'flex-start'
              },
              {
                label: '底部',
                value: 'flex-end'
              },
              {
                label: '垂直居中',
                value: 'center'
              }
            ]
          }
        ]
      },
      {
        key: 'flexDirection',
        component: 'el-select',
        label: '排列方向',
        child: [
          {
            component: 'el-option',
            optionList: [
              {
                label: '水平',
                value: 'row'
              },
              {
                label: '垂直',
                value: 'column'
              }
            ]
          }
        ]
      }
    ],
    customList: [
      {
        divider: '自定义',
        key: 'custom',
        component: 'el-input',
        label: '自定义',
        tips: 'HH为顶部Bar高度，可用于计算',
        props: {
          type: 'textarea',
          resize: 'both',
          rows: 1
        }
      }
    ]
  }
}
