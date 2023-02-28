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
    box = true,
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
  return {
    //位置配置
    boxList: [
      {
        divider: '位置',
        field: 'position',
        type: 'el-select',
        title: '定位',
        on: {
          change: (val) => {
            if (val !== 'relative') {
              value.zIndex = 10
            }
          },
        },
        options: [
          {
            //兼容老版本处理 relative 和 static状态交换
            title: '静态定位(默认)',
            value: 'relative',
          },
          {
            title: '相对定位',
            value: 'static',
          },
          {
            title: '绝对定位',
            value: 'absolute',
          },
          {
            title: '固定定位',
            value: 'fixed',
          },
          {
            title: '粘性定位',
            value: 'sticky',
          },
        ],
      },
      {
        field: 'zIndex',
        type: 'el-input-number',
        title: '层级',
      },
      {
        field: 'left',
        type: 'el-input',
        title: '左距',
        props: {
          clearable: true,
          type: 'number',
        },
        on: {},
      },
      {
        field: 'top',
        type: 'el-input',
        title: '上距',
        props: {
          clearable: true,
          type: 'number',
        },
        on: {},
      },
      {
        field: 'right',
        type: 'el-input',
        title: '右距',
        props: {
          clearable: true,
          type: 'number',
        },
      },
      {
        field: 'bottom',
        type: 'el-input',
        title: '底距',
        props: {
          clearable: true,
          type: 'number',
        },
      },
      {
        divider: '盒子',
        field: 'width',
        type: 'el-input-number',
        title: '宽度',
        button: '',
        btnClick: () => {
          value.width = floor(Number(value.height) * ratio, 2)
        },
      },
      {
        field: 'height',
        type: 'el-input-number',
        title: '高度',
        button: '',
        btnClick: () => {
          value.height = floor(Number(value.width) / ratio, 2)
        },
      },
      {
        field: 'borderRadius',
        type: 'el-input-number',
        title: '圆角',
      },
    ],
    //背景
    backgroundList: [
      //背景图片
      {
        divider: '背景',
        field: 'backgroundImage',
        type: 'upload-file',
        title: '背景图片',
      },
      //背景颜色
      {
        field: 'backgroundColor',
        type: 'el-color-picker',
        title: '背景颜色',
        props: {
          'show-alpha': true,
        },
      },
      {
        field: 'backgroundRepeat',
        type: 'el-select',
        title: '背景是否重复',
        props: {
          placeholder: '请选择',
        },
        options: [
          {
            title: '不重复(no-repeat)',
            value: 'no-repeat',
          },
          {
            title: '垂直和水平方向重复(repeat)',
            value: 'repeat',
          },
          {
            title: '水平重复(repeat-x)',
            value: 'repeat-x',
          },
          {
            title: '垂直重复(repeat-y)',
            value: 'repeat-y',
          },
          {
            title: '父元素继承(inherit)',
            value: 'inherit',
          },
        ],
      },
      {
        field: 'backgroundSize',
        type: 'el-input',
        title: '背景大小',
      },
    ],
    //文字配置
    fontList: [
      {
        divider: '字体',
        field: 'color',
        type: 'el-color-picker',
        title: '字体颜色',
        props: {
          'show-alpha': true,
        },
      },
      {
        field: 'fontSize',
        type: 'el-input-number',
        title: '字体大小',
      },
      {
        field: 'fontWeight',
        type: 'el-select',
        title: '字体粗细',
        options: [
          {
            title: '默认值(normal)',
            value: 'normal',
          },
          {
            title: '粗体(bold)',
            value: 'bold',
          },
          {
            title: '更粗(bolder)',
            value: 'bolder',
          },
          {
            title: '更细(lighter)',
            value: 'lighter',
          },
          {
            title: '100',
            value: '100',
          },
          {
            title: '200',
            value: '200',
          },
          {
            title: '300',
            value: '300',
          },
          {
            title: '400(同于 normal)',
            value: '400',
          },
          {
            title: '500',
            value: '500',
          },
          {
            title: '600',
            value: '600',
          },
          {
            title: '700( 等同于 bold)',
            value: '700',
          },
          {
            title: '800',
            value: '800',
          },
          {
            title: '900',
            value: '900',
          },
        ],
      },
    ],
    //内容位置
    flexList: [
      {
        divider: '内容位置',
        field: 'justifyContent',
        type: 'el-select',
        title: '水平方向',
        options: [
          {
            title: '居左',
            value: 'flex-start',
          },
          {
            title: '居右',
            value: 'flex-end',
          },
          {
            title: '水平居中',
            value: 'center',
          },
        ],
      },
      {
        field: 'alignItems',
        type: 'el-select',
        title: '竖直方向',
        options: [
          {
            title: '顶部',
            value: 'flex-start',
          },
          {
            title: '底部',
            value: 'flex-end',
          },
          {
            title: '垂直居中',
            value: 'center',
          },
        ],
      },
      {
        field: 'flexDirection',
        type: 'el-select',
        title: '排列方向',
        options: [
          {
            title: '水平',
            value: 'row',
          },
          {
            title: '垂直',
            value: 'column',
          },
        ],
      },
    ],
    customList: [
      {
        divider: '自定义',
        field: 'custom',
        type: 'el-input',
        title: '自定义',
        tips: 'HH为顶部Bar高度，可用于计算',
        props: {
          type: 'textarea',
          resize: 'both',
          rows: 1,
        },
      },
    ],
  }
}
