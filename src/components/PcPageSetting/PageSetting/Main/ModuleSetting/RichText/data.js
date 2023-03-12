export default class RichTextData {
  constructor() {
    this.space = '' //显示连续空格
    this.userSelect = false //文本是否可选，该属性会使节点显示为 block
    this.nodes = '' //HTML String
  }
}

export const formList = [
  {
    type: 'el-select',
    field: 'space',
    title: '空格大小',
    options: [
      {
        label: '中文字符空格一半大小',
        value: 'ensp',
      },
      {
        label: '中文字符空格大小',
        value: 'emsp',
      },
      {
        label: '根据字体设置的空格大小',
        value: 'nbsp',
      },
    ],
  },
  {
    type: 'el-switch',
    field: 'userSelect',
    title: '文本是否可选',
  },
  {
    type: 'editor',
    field: 'nodes',
    title: '富文本内容',
  },
]
