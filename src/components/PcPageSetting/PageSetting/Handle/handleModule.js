import { forEach } from 'lodash'

//处理热区组件
const handleImageSetting = (imageSetting, fn) => {
  if (!imageSetting?.imgUrl) return
  if (imageSetting?.hotModuleSettings?.length) {
    forEach(imageSetting.hotModuleSettings, (child) => {
      fn({ data: child, type: 'hotModule', parents: imageSetting })
    })
  }
}

//处理子组件
const handleModule = (pageSetting, fn, parents = null) => {
  if (pageSetting?.moduleSettings?.length) {
    forEach(pageSetting.moduleSettings, (elem) => {
      handleModule(elem, fn, pageSetting)
      if (elem?.imageSetting?.imgUrl) {
        handleImageSetting(elem.imageSetting, fn)
      }
    })
  }
  if (pageSetting?.events?.length) {
    forEach(pageSetting.events, (elem) => {
      if (elem?.hotOperations?.length) {
        forEach(elem?.hotOperations, (hot) => {
          if (hot?.imageSetting?.imgUrl) {
            handleImageSetting(hot.imageSetting, fn)
          }
        })
      }
    })
  }
  handleImageSetting(pageSetting.imageSetting, fn)
  fn({ data: pageSetting, type: 'moduleSettings', parents })
}

export default handleModule
