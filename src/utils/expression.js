// const SYMBOL = {
//   "==": "eq", //等于
//   "===": "eq", //等于
//   "!=": "ne", //不等于
//   "!==": "ne", //不等于
//   ">": "gt", //大于
//   "<": "lt", //小于
//   ">=": "ge", //大于等于
//   "<=": "le", //小于等于
//   like: "like", //模糊
//   in: "in", //包含
// };
export default (expArr) => {
  for (let i = 0; i < expArr.length; i = i + 2) {
    if (
      Array.isArray(expArr[i]) &&
      expArr[i].some((e) => e === null || e === undefined || e === '')
    ) {
      expArr[i] = ''
      expArr[i + 1] = ''
    }
  }
  expArr = expArr
    .filter((item) => item)
    .map((item) => {
      if (Array.isArray(item)) {
        return item.join(' ')
      }
      return item
    })
  while (['AND', 'OR', 'and', 'or'].includes(expArr[expArr.length - 1])) {
    expArr.length = expArr.length - 1
  }
  const expression = expArr.join(' ').trim()
  expression && //console.log(expression)
  return expression || null
}
