import useClipboard from 'vue-clipboard3'
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus'
/**
 * 复制事件
 */
const { toClipboard } = useClipboard()
export const handleCopyEvents = (item) => {
  //console.log('item', item)
  // 拷贝对象不能为数组、对象类型。使用JSON.stringify转化为字符串
  const event = cloneDeep(JSON.stringify(item))
  toClipboard(event)
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
}
