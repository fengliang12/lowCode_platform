import { isString } from "lodash"
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

const delObjKey = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((elem) => {
    if (obj[elem] || obj[elem] === 0) {
      newObj[elem] = obj[elem]
    }
  })
  return newObj
}
/**
 * 如果入参里面有expression字段 会进行自动格式化 规则如下
 *  1.如果expression字段为object,会自动读取key对应的查询条件,查不到对应的key就会默认查询条件为eq(等于),实例如下：
 *    expression ={ age : ConditionEnum.大于, name : ConditionEnum.模糊匹配 }  ===》 age gt xxx AND name like xxx
 *  2.如果expression字段为字符串，就不会转换，直接提交给后台
 */
// 设置请求参数
export const formatParams = function (params, expressionKey = {}) {
  const data = delObjKey({ ...params })
  let expression = ''
  for (let key in data) {
    expression = `${expression}${expression ? ' AND ' : ''}`
    if (data[key] instanceof Array) {
      expression = `${expression}${key}ge${handleParams(data[key][0])} AND ${key}le${handleParams(data[key][1])}`
    } else {
      expression = `${expression}${key}${expressionKey[key] || '='}${handleParams(data[key])
        }`
    }
  }
  return expression
}


export const handleParams = (val) => {
  return isString(val) ? `'${val}'` : val
}