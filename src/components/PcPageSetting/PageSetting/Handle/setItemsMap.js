import handleModule from './handleModule.js'

//设置itemsMap数据
const setItemsMap = (pageSetting, set = new Map(), opt = 'set') => {
  handleModule(pageSetting, ({ data, parents }) => {
    const code = data.code || data.id
    if (code) {
      if (opt === 'delete') {
        set.delete(code)
      } else {
        data.parentsCode = parents?.code ?? parents?.id
        set.set(code, data)
      }
    }
  })
  console.log('itemsMap', set)
  return set
}
export default setItemsMap
