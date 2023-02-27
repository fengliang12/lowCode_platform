import PageBoxSettingData from '../pageBoxSetting/data'
import { pageValueData } from '../setData/data'

export default class {
  constructor() {
    this.code = ''
    this.alias = '' //别名
    this.customAlias = '' //别名自定义值
    this.content = '' //内容
    this.hotOperations = [] //热区事件
    this.hotType = 'common' //热区类型 通用 common; 表单 form
    this.borderDistance = new PageBoxSettingData({ width: 0, height: 0 }) //盒子大小配置
    this.sort = 1 // 排序值热区层级
    this.pageShowData = {
      showType: 'text', //文本或图片 text/image
      pageValue: new pageValueData()
    }
    this.formData = null
    this.pageStyle = null
  }
}

export const hotTypeList = [
  {
    value: 'common',
    label: '普通'
  },
  {
    value: 'form',
    label: '表单'
  }
]
