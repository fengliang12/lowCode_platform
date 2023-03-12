export default class {
  constructor() {
    this.direction = "left"; //吸附方向 左、顶
  }
}

export const formListFn = function () {
  return [
    {
      type: 'el-select',
      field: 'direction',
      title: '吸附方向',
      options: [
        {
          label: '左',
          value: 'left'
        },
        {
          label: '右',
          value: 'right'
        }
      ]
    }
  ]
}