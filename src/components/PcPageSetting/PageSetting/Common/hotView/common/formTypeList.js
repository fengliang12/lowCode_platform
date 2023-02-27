import { pageValueData } from '../../setData/data'
//表单基础值
const basicForm = class {
  //unValue不需要默认值
  constructor({ unValue = false } = {}) {
    if (!unValue) {
      this.pageValue = new pageValueData()
    }
    this.placeholder = '' //输入提示
    this.placeholderStyle = '' //指定 placeholder 的样式类
    this.disabled = false //是否禁用
  }
}
//表单组件
export const Input = class extends basicForm {
  constructor() {
    super()
    this.type = 'text' //输入类型 number nickname digit 带小数点的数字键盘  idCard
    this.password = false //是否为密码类型
    this.maxlength = 140 //输入的最大长度-1为不限制长度
    this.focus = false //自动获取焦点
    this.confirmType = 'done' //设置键盘右下角按钮的文字，仅在type='text'时生效
  }
}
//日期
export const M_Date = class extends basicForm {
  constructor() {
    super()
    this.start = {
      //开始时间
      type: 'fixed', //fixed固定值 relative相对值 以今天为准向前几天或向后几天
      value: ''
    }
    this.end = {
      //结束
      type: 'fixed', //fixed固定值 relative相对值 以今天为准向前几天或向后几天
      value: ''
    }
    this.fields = 'day' //有效值 year month day，表示选择器的粒度
  }
}
//oms会员地址
export const OmsAddress = class extends basicForm {
  constructor() {
    super({ unValue: true })
    this.valueList = [
      {
        key: 'province', //省份
        pageValue: new pageValueData({ valueType: 'pageData' })
      },
      {
        key: 'city', //城市
        pageValue: new pageValueData({ valueType: 'pageData' })
      },
      {
        key: 'district', //地区
        pageValue: new pageValueData({ valueType: 'pageData' })
      },
      {
        key: 'postcode', //地区code
        pageValue: new pageValueData({ valueType: 'pageData' })
      }
    ]
  }
}

export class Cascader extends basicForm {
  constructor(type = 'custom') {
    super({ unValue: true })
    this.type = type // 级联选择的类型
    if (type == 'custom') {
      this.cascaderList = [] // 自定义的Options
    } else if (type == 'pageData') {
      this.maxlength = 0 // 层级数
      this.dataType = 'treeData' // 级联选择的数据类型
      this.props = 'label,value,children' // 级联选择的props格式化
    }

    this.valueList = [] // 层级默认值
    this.showSelectedValue = false // 是否展示选中后的label

    // "{ label: label ; value: value; children: children }"
  }
}

//复选框
export const formTypeList = [
  {
    value: 'Input',
    label: '输入框',
    class: Input
  },
  {
    value: 'Date',
    label: '日期',
    class: M_Date
  },
  {
    value: 'OmsAddress',
    label: 'oms地址',
    class: OmsAddress,
    defaultKey: 'addressInfo' //默认key值
  },
  {
    value: 'Cascader',
    label: '级联选择器',
    class: Cascader
  }
]
//key映射class对象
export const formTypeKeyMapClass = Object.fromEntries(
  formTypeList.map((elem) => [elem.value, elem])
)

//表单列表顺序
export const formComponentsList = [
  //默认值
  {
    key: 'pageValue',
    component: 'setData',
    label: '默认值',
    usValue: true,
    span: 24
  },
  //多组默认值
  {
    key: 'valueList',
    label: '多组默认数据配置',
    province: '省份',
    city: '城市',
    district: '地区',
    postcode: '地区code'
  },
  //输入提示
  {
    key: 'placeholder',
    component: 'el-input',
    label: '输入提示'
  },
  {
    key: 'placeholderStyle',
    component: 'el-input',
    label: '输入提示样式'
  },
  {
    key: 'disabled',
    component: 'el-switch',
    label: '是否禁用',
    activeText: '是',
    inactiveText: '否'
  },
  {
    key: 'type',
    component: 'el-select',
    label: '输入框类型',
    child: [
      {
        component: 'el-option',
        optionList: [
          {
            label: '文本(text)',
            value: 'text'
          },
          {
            label: '数字(number)',
            value: 'number'
          },
          {
            label: '身份证(idcard)',
            value: 'idcard'
          },
          {
            label: '带小数点(digit)',
            value: 'digit'
          },
          {
            label: '昵称(nickname)',
            value: 'nickname'
          }
        ]
      }
    ]
  },
  //是否为密码类型
  {
    key: 'password',
    component: 'el-switch',
    label: '是否为密码',
    activeText: '是',
    inactiveText: '否'
  },
  //输入的最大长度-1为不限制长度
  {
    key: 'maxlength',
    component: 'el-input-number',
    label: '最大长度',
    tips: '输入的最大长度-1为不限制长度'
  },
  //自动获取焦点
  {
    key: 'focus',
    component: 'el-switch',
    label: '自动获取焦点',
    activeText: '是',
    inactiveText: '否'
  },
  {
    key: 'confirmType',
    component: 'el-select',
    label: '键盘右下角按钮的文字',
    child: [
      {
        component: 'el-option',
        optionList: [
          {
            label: '发送',
            value: 'send'
          },
          {
            label: '搜索',
            value: 'search'
          },
          {
            label: '下一个',
            value: 'next'
          },
          {
            label: '前往',
            value: 'go'
          },
          {
            label: '完成',
            value: 'done'
          }
        ]
      }
    ]
  },
  {
    key: 'start',
    component: 'a-date',
    label: '开始时间'
  },
  {
    key: 'end',
    component: 'a-date',
    label: '结束时间'
  }
]
// 配置表单
export const formComponents = Object.fromEntries(
  formComponentsList.map((elem, index) => {
    elem.index = index
    return [elem.key, elem]
  })
)
