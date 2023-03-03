export const checkFile = (fileValue) => {
  console.log(fileValue)
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
