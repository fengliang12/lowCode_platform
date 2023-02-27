export class pageValueData {
  constructor({ valueType = 'custom', value = '', unValue = false } = {}) {
    if (!unValue) {
      this.value = value //值
      this.valueType = valueType //值类型自定义/页面数据 custom  | pageData | parents
      this.defaultValue = '' //默认值
      this.handle = null
    }
  }
}
