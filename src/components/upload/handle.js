export const checkFile = (fileValue) => {
  if (!fileValue) return ''
  var index = fileValue.lastIndexOf('.') //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
  let fileValueSuffix = fileValue.substring(index) //截断"."之前的，得到后缀
  if (/(.*)\.(mp4|avi|wmv|MP4|AVI|WMV|rmvb|ts)$/.test(fileValueSuffix)) {
    //根据后缀，判断是否符合视频格式
    return 'video'
  } else if (
    /(.*)\.(jpg|JPG|bmp|BMP|mpg|MPG|tis|TIS|gif|jpeg|png|PNG|GIF|webp)$/.test(
      fileValueSuffix,
    )
  ) {
    //根据后缀，判断是否符合图片格式
    return 'image'
  } else if (
    /(.*)\.(mp3|MP3|ogg|OGG|wav|WAV|midi|MIDI|wma|WMA|mpeg|MPEG)$/.test(
      fileValueSuffix,
    )
  ) {
    //根据后缀，判断是否符合音频格式
    return 'audio'
  }
  return ''
}

export const getWebpFromFile = () => {
  return new Promise((resolve) => {
    if (!['image/png', 'image/jpeg'].includes(rawFile.type))
      return resolve(rawFile)
    const url = URL.createObjectURL(rawFile)
    try {
      const img = new Image()
      img.crossOrigin = '*'
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        canvas.getContext('2d').drawImage(img, 0, 0)
        canvas.toBlob(
          (result) => {
            const newFile = new File([result], '1.webp', {
              type: 'image/webp',
            })
            resolve(newFile)
            URL.revokeObjectURL(url)
          },
          'image/webp',
          0.92,
        )
      }
      img.src = url
    } catch (error) {
      resolve(rawFile)
      URL.revokeObjectURL(url)
    }
  })
}

export const getVideoInfo = (file) => {
  return new Promise((resole) => {
    var blob = new Blob([file]) // 文件转化成二进制文件
    const el = document.createElement('video')
    el.currentTime = 0.5
    el.src = URL.createObjectURL(blob)
    //console.log(URL.createObjectURL(blob));
    el.addEventListener('canplay', async () => {
      el.width = el.videoWidth
      el.height = el.videoHeight
      resole(el)
    })
  })
}

/**
 * 获取图片信息
 * @param {*} file
 * @returns
 */
export const getImageInfo = (file) => {
  return new Promise((resolve) => {
    const blob = new Blob([file])
    let el = new Image()
    el.src = URL.createObjectURL(blob)
    el.addEventListener('load', function () {
      resolve(el)
    })
  })
}

/**
 * 获取图片信息
 * @param {*} file
 * @returns
 */
export const getAudioInfo = (file) => {
  return new Promise((resolve) => {
    const blob = new Blob([file])
    const el = document.createElement('video')
    el.src = URL.createObjectURL(blob)
    el.width = '750'
    el.height = '120'
    el.addEventListener('canplay', function () {
      resolve(el)
    })
  })
}

export const fileInfo = (selectFileType, file) => {
  const firstGet = selectFileType === 'audio' ? getAudioInfo : getImageInfo
  const get = selectFileType === 'video' ? getVideoInfo : firstGet
  return get(file)
}
