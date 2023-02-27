import IndexDBWrapper from 'indexdbwrapper'

const dbName = 'db'
const version = 1
export const storeName = 'pageHistory'
export default new IndexDBWrapper(dbName, version, {
  onupgradeneeded: (event) => {
    const db = event.target.result // 数据库对象
    if (!db.objectStoreNames.contains(storeName)) {
      // 创建表
      db.createObjectStore(storeName, { keyPath: 'id' })
    }
  }
})
