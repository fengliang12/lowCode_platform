import bus from '@/utils/bus'

const popupComponentList = (element) => [
  {
    type: 'object',
    field: 'imageSetting',
    formList: [
      {
        field: 'imgUrl',
        type: 'upload-file',
        props: {
          hasEditBack: true,
          'on-success': (e) => {
            uploadSuccessCallback(e, element)
          },
        },
        on: {
          editBack: () => popEdit(element),
        },
      },
    ],
  },
]

/**
 * 图片上传成功
 * @param {*} e
 * @param {*} element
 */
const uploadSuccessCallback = (e, element) => {
  //设置宽高比
  if (e.ratio) {
    element.imageSetting.ratio = e.ratio
  }
  if (e.firstFrameVideo && element.imageSetting.firstFrameVideo) {
    ElMessageBox.confirm('是否替换首针图', {
      title: '提示',
      type: 'warning',
    }).then(() => {
      element.imageSetting.firstFrameVideo = e.firstFrameVideo
    })
  } else {
    element.imageSetting.firstFrameVideo = e.firstFrameVideo
  }
  element.imageSetting.multimediaType =
    e.fileType === 'image' ? 'img' : e.fileType
  UploadSuccessSetBoxInfo(element.imageSetting, e)
}

/**
 * 更新宽高
 * @param {*} imageSetting
 * @param {*} e
 * @param {*} showPageBoxSetting
 */
const UploadSuccessSetBoxInfo = (
  imageSetting,
  e,
  showPageBoxSetting = null,
) => {
  const { height, width = 0 } = e.el
  if (width) {
    const { width: newWidth } = imageSetting.borderDistance
    let ratio = width / height
    // value.borderDistance.width = 750;
    imageSetting.borderDistance.height = newWidth / ratio
  } else if (!showPageBoxSetting) {
    imageSetting.borderDistance.width = 0
    imageSetting.borderDistance.height = 0
  }
}

/**
 * 编辑图片
 * @param {*} element
 */
const popEdit = (element) => {
  console.log('element', element)
  bus.emit('popEdit', element)
}

export { popupComponentList }
