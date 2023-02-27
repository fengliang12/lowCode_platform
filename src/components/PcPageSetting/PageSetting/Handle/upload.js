import { ElMessageBox } from 'element-plus'

/**
 * 设置宽高
 * @param {*} imageSetting
 * @param {*} e
 * @param {*} showPageBoxSetting
 */
export const UploadSuccessSetBoxInfo = (
  imageSetting,
  e,
  showPageBoxSetting
) => {
  const { height, width = 0 } = e.el
  if (width) {
    const { width: newWidth } = imageSetting.borderDistance
    let ratio = width / height
    imageSetting.borderDistance.height = newWidth / ratio
  } else if (!showPageBoxSetting) {
    imageSetting.borderDistance.width = 0
    imageSetting.borderDistance.height = 0
  }
}

/**
 * 处理上传成功信息
 * @param {*} imageSetting
 * @param {*} e
 * @param {*} showPageBoxSetting
 */
export const handleUploadSuccessInfo = (
  imageSetting,
  e,
  showPageBoxSetting
) => {
  //设置宽高比
  if (e.ratio) {
    imageSetting.ratio = e.ratio
  }

  if (e.firstFrameVideo && imageSetting.firstFrameVideo) {
    ElMessageBox.confirm('是否替换首针图?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      imageSetting.firstFrameVideo = e.firstFrameVideo
    })
  } else {
    imageSetting.firstFrameVideo = e.firstFrameVideo
  }
  imageSetting.multimediaType = e.fileType === 'image' ? 'img' : e.fileType
  UploadSuccessSetBoxInfo(imageSetting, e, showPageBoxSetting)
}
