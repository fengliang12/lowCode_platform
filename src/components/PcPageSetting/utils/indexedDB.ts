import IndexDBWrapper from 'indexdbwrapper'

const dbName = 'db'
const version = 1
const storeName = 'pageHistory'

const indexedDB = new IndexDBWrapper(dbName, version, {
  onupgradeneeded: (event: any) => {
    const db = event.target.result // 数据库对象
    if (!db.objectStoreNames.contains(storeName)) {
      // 创建表
      db.createObjectStore(storeName, { keyPath: 'id' })
    }
  },
})

/**
 * 将每一次操作成功的数据备份到indexDB中
 */
const saveIndexedDB = async (pageList: any) => {
  console.log('pageList', pageList)

  const id = `syncBrandComponentHistory_${pageList[0].id}`
  const history = await indexedDB.get(storeName, id)
  if (!history) {
    indexedDB.add(storeName, {
      id: id,
      value: [
        {
          time: new Date(),
          data: pageList,
        },
      ],
    })
  } else {
    const pageString = JSON.stringify(pageList)
    const saveTemp = history.value
    if (
      pageString != JSON.stringify(saveTemp[saveTemp.length - 1].data || {})
    ) {
      saveTemp.push({
        time: new Date(),
        data: pageList,
      })
      if (saveTemp.length > 10) {
        saveTemp.shift()
      }
      indexedDB.put(storeName, {
        id: id,
        value: saveTemp,
      })
    }
  }
}

const getIndexedDB = async (pageId: string) => {
  if (!pageId) return
  const id = `syncBrandComponentHistory_${pageId}`
  const history = await indexedDB.get(storeName, id)
  console.log('history', history)

  const saveTemp = history.value
  console.log('saveTemp', saveTemp)

  return saveTemp
  // if (!history) {
  //   indexedDB.add(storeName, {
  //     id: id,
  //     value: [
  //       {
  //         time: new Date(),
  //         data: pageList,
  //       },
  //     ],
  //   })
  // } else {
  //   const pageString = JSON.stringify(pageList)
  //   if (
  //     pageString != JSON.stringify(saveTemp[saveTemp.length - 1].data || {})
  //   ) {
  //     saveTemp.push({
  //       time: new Date(),
  //       data: pageList,
  //     })
  //     if (saveTemp.length > 10) {
  //       saveTemp.shift()
  //     }
  //     indexedDB.put(storeName, {
  //       id: id,
  //       value: saveTemp,
  //     })
  //   }
  // }
}

export default { saveIndexedDB, getIndexedDB }
