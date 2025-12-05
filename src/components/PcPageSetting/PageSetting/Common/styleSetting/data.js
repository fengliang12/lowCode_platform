import { floor } from 'lodash-es'
export class styleSettingData {
  constructor({
    width = 750,
    height = 200,
    position = 'relative',
    left,
    top,
    background = true,
    font = true,
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
    if (font) {
      this.fontSize = 28
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
      this.zIndex = null
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
            label: '静态定位(默认)',
            value: 'relative',
          },
          {
            label: '相对定位',
            value: 'static',
          },
          {
            label: '绝对定位',
            value: 'absolute',
          },
          {
            title: '固定定位',
            value: 'fixed',
          },
          {
            label: '粘性定位',
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
        type: 'el-input-number',
        title: '左距',
        props: {
          clearable: true,
          type: 'number',
        },
      },
      {
        field: 'top',
        type: 'el-input-number',
        title: '上距',
        props: {
          clearable: true,
          type: 'number',
        },
      },
      {
        field: 'right',
        type: 'el-input-number',
        title: '右距',
        props: {
          clearable: true,
          type: 'number',
        },
      },
      {
        field: 'bottom',
        type: 'el-input-number',
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
          value.width = floor(Number(value.height) / ratio, 2)
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
          'show-alpha': true, //是否支持透明度选择
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
            label: '不重复(no-repeat)',
            value: 'no-repeat',
          },
          {
            label: '垂直和水平方向重复(repeat)',
            value: 'repeat',
          },
          {
            label: '水平重复(repeat-x)',
            value: 'repeat-x',
          },
          {
            label: '垂直重复(repeat-y)',
            value: 'repeat-y',
          },
          {
            label: '父元素继承(inherit)',
            value: 'inherit',
          },
        ],
      },
      {
        field: 'backgroundSize',
        type: 'el-input',
        title: '背景大小',
        props: {
          'input-style': {
            width: '200px',
          },
        },
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
        defaultValue: 28,
      },
      {
        field: 'fontWeight',
        type: 'el-select',
        title: '字体粗细',
        options: [
          {
            label: '默认值(normal)',
            value: 'normal',
          },
          {
            label: '粗体(bold)',
            value: 'bold',
          },
          {
            label: '更粗(bolder)',
            value: 'bolder',
          },
          {
            label: '更细(lighter)',
            value: 'lighter',
          },
          {
            label: '100',
            value: '100',
          },
          {
            label: '200',
            value: '200',
          },
          {
            title: '300',
            value: '300',
          },
          {
            label: '400(同于 normal)',
            value: '400',
          },
          {
            label: '500',
            value: '500',
          },
          {
            label: '600',
            value: '600',
          },
          {
            label: '700( 等同于 bold)',
            value: '700',
          },
          {
            label: '800',
            value: '800',
          },
          {
            label: '900',
            value: '900',
          },
        ],
      },
    ],
    //内容位置
    flexList: [
      {
        divider: '内容位置',
        field: 'flexDirection',
        type: 'el-select',
        title: '排列方向',
        options: [
          {
            label: '水平',
            value: 'row',
          },
          {
            label: '垂直',
            value: 'column',
          },
        ],
      },
      {
        field: 'justifyContent',
        type: 'el-select',
        title: '水平方向',
        options: [
          {
            label: '居左',
            value: 'flex-start',
          },
          {
            label: '居右',
            value: 'flex-end',
          },
          {
            label: '水平居中',
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
            label: '顶部',
            value: 'flex-start',
          },
          {
            label: '底部',
            value: 'flex-end',
          },
          {
            label: '垂直居中',
            value: 'center',
          },
        ],
      },
    ],
    customList: [
      {
        divider: '自定义样式--HH为顶部Bar高度',
        field: 'custom',
        type: 'el-input',
        title: '自定义',
        tips: 'HH为顶部Bar高度，可用于计算',
        props: {
          type: 'textarea',
          resize: 'both',
          rows: 2,
        },
      },
    ],
  }
}
