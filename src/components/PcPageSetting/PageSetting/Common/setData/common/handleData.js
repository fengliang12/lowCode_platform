import { pageValueData } from '../data'
export class HandleData {
  constructor({ valueType } = {}) {
    this.key = ''
    // 方法
    this.method = ''
    //页面 key Word
    this.pageValue = new pageValueData({ valueType })
  }
}
