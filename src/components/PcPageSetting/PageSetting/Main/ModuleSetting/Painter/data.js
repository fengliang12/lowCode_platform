export default class PainterData {
  constructor() {
    this.scaleRatio = 1
    this.widthPixel = 0
    this.use2D = true
  }
}

export const formList = [
  {
    field: 'scaleRatio',
    type: 'el-input-number',
    title: '进度',
  },
  {
    field: 'widthPixel',
    type: 'el-input-number',
    title: '像素宽度',
  },
  {
    field: 'use2D',
    type: 'el-switch',
    title: '是否使用2d',
  },
]
