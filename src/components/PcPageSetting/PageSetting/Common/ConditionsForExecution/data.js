import { pageValueData } from '../setData/data'

// ConditionsForExecution {
//   child (Array[ConditionsForExecution], optional): 子集 ,
//   content (PageValue, optional): 比较值 ,
//   execution (string, optional): 判断条件 = < > != = ,
//   interrupt (boolean, optional): 选择 不满足条件时是否中断后面所有事件 ,
//   trueInterrupt (boolean, optional): 满足条件中断条件 ,
//   type (string, optional): and or ,
//   value (PageValue, optional): 取值
// }
export class ConditionsData {
  constructor({
    child = [],
    id = 1,
    interrupt = null,
    trueInterrupt = null,
  } = {}) {
    this.value = new pageValueData({ valueType: 'pageData' }) //取值
    this.execution = '=' //  = < > != <=  >= 判断条件
    this.content = new pageValueData({
      interrupt: null,
      trueInterrupt: null,
    }) //比较值
    this.type = null //and  or
    this.child = child
    this.id = id
    this.interrupt = interrupt //中断后续操作
    this.trueInterrupt = trueInterrupt //中断后续操作
  }
}

export const conditionsList = [
  {
    label: '等于',
    value: '=',
  },
  {
    label: '不等于',
    value: '!=',
  },
  {
    label: '小于',
    value: '<',
  },
  {
    label: '小等于',
    value: '<=',
  },
  {
    label: '大于',
    value: '>',
  },
  {
    label: '大等于',
    value: '>=',
  },
  {
    label: '存在',
    value: 'existent',
  },
  {
    label: '不存在',
    value: 'non-existent',
  },
  {
    label: '含有',
    value: 'includes',
  },
  {
    label: '不含有',
    value: 'no-includes',
  },
]

export const andOr = [
  {
    label: '或者',
    value: 'or',
  },
  {
    label: '并且',
    value: 'and',
  },
]
