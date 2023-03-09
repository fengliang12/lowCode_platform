<template>
  <el-dialog
    :model-value="visible"
    @close="close"
    append-to-body
    :show-close="true"
    destroy-on-close
  >
    <div class="contentBox" ref="hotViewElDialogRef">
      <!-- 左边热区绘制 -->
      <div id="imgBox" class="hotViewImgBox" ref="hotViewImgBoxRef">
        <div class="bgImg">
          <ImageVideo
            ref="bgImgRef"
            :src="imgUrl"
            @load="imageLoaded"
          ></ImageVideo>
        </div>
        <!-- 热区内容 -->
        <template v-for="item in hotView" :key="item.code">
          <ShowTemplate :value="item"></ShowTemplate>
        </template>
        <div
          v-for="(item, index) in hotView"
          :key="item.code"
          :style="`width:${item.pageStyle.width}px;height:${item.pageStyle.height}px;left:${item.pageStyle.left}px;top:${item.pageStyle.top}px;cursor:pointer;z-index:${item.sort}`"
          :class="`${index === currentIndex ? 'on' : ''}`"
          class="hotViewDiv"
          @click="chooseHotView(index)"
          @mousedown.stop="mouseDown($event, index)"
          @mouseup="mouseUp"
        >
          <div data-type="move" class="lineBox">
            <div
              v-for="child in lineList"
              :key="child"
              :class="child"
              :data-type="child"
              class="line"
            ></div>
          </div>
          <div @click.stop="() => doDelete(index)" class="delHot">✕</div>
        </div>
      </div>
      <!-- 右边热区编辑 -->
      <div class="form">
        <el-form v-if="currentIndex != -1 && hotView && hotView.length">
          <div class="mb10">
            code：<span class="code">{{ hotView[currentIndex].code }}</span>
          </div>
          <el-form-item :label-width="formLabelWidth" label="热区标题：">
            <el-input v-model="hotView[currentIndex].title"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="热区类型：">
            <el-select
              v-model="hotView[currentIndex].hotType"
              placeholder="选择类型"
              @change="hotTypeChange"
            >
              <el-option
                v-for="item in hotTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-tabs>
            <el-tab-pane label="配置">
              <template v-if="hotView[currentIndex].hotType === 'common'">
                <el-form-item :label-width="formLabelWidth" label="显示数据：">
                  <SetData
                    ref="setData"
                    v-model="hotView[currentIndex].pageShowData.pageValue"
                    inputType="textarea"
                    :wrap="true"
                  >
                    <el-select
                      v-model="hotView[currentIndex].pageShowData.showType"
                      placeholder="选择显示类型"
                    >
                      <el-option
                        v-for="item in showTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </SetData>
                </el-form-item>
              </template>
              <HotForm
                v-if="hotView[currentIndex].hotType === 'form'"
                v-model="hotView[currentIndex].formData"
              ></HotForm>
            </el-tab-pane>
            <el-tab-pane label="样式">
              <!-- 页面样式 -->
              <StyleSetting
                v-model="hotView[currentIndex].pageStyle"
                :font="true"
              />
            </el-tab-pane>
            <el-tab-pane label="事件">
              <SelectJumpType v-model="hotView[currentIndex].hotOperations" />
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </div>
    <template #footer>
      <el-button @click="close"> 取 消 </el-button>
      <el-button @click="save" type="primary"> 确 定 </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import ShowTemplate from './showTemplate.vue'
import ImageVideo from '../imageVideo/index.vue'
import { cloneDeep, debounce } from 'lodash'
import { generateId } from '../../Handle/util'
import componentsMapping from '../../CommonData/componentsMapping'
import { formTypeList } from '../hotForm/common/formTypeList'
import SetData from '../setData/index.vue'
import StyleSetting from '../styleSetting/index.vue'
import SelectJumpType from '../selectJumpType/index.vue'
import HotForm from '../hotForm/index.vue'
import { showTypeList } from '../setData/common/pageData'
import posData, { hotTypeList } from './data'

const emit = defineEmits(['update:modelValue', 'update:visible'])
const props = defineProps(['modelValue', 'visible', 'imgUrl'])
const formLabelWidth = inject('formLabelWidth', 100)

const lineList = ['top', 'right', 'bottom', 'left']
const hotViewImgBoxRef = ref(null)
const hotView = ref([])
const flag = ref(false) //鼠标还没有抬起

onMounted(() => {
  // 初始化热区数据
  setHotView()
  //初始化window事件（resize，mouseup）
  initWindowEvent()
})

/**
 * 初始化热区数据
 */
const setHotView = () => {
  if (props.modelValue) {
    hotView.value = cloneDeep(props.modelValue).map((elem) => {
      const data = new posData()
      Object.keys(data).forEach((key) => {
        if (!elem[key]) {
          elem[key] = data[key]
        }
      })
      return elem
    })
  }
}

/**
 * 初始化window事件（resize，mouseup）
 */
const initWindowEvent = () => {
  const resize = debounce(() => {
    if (!props.visible) return
    getDomRect()
  }, 500)
  window.addEventListener('resize', resize)

  const windowMouseup = () => {
    if (!props.visible) return
    mouseUp()
    if (flag.value) {
      hotViewImgBoxRef.value.onmouseup()
    }
  }
  window.addEventListener('mouseup', windowMouseup)
}

/**
 * 获取图片的基本信息（宽高）
 */
const bgImgRef = ref(null)
const domRect = ref({})
const getDomRect = () => {
  console.log('调用了')
  if (!hotViewImgBoxRef?.value || !bgImgRef.value) return
  const clientBox = hotViewImgBoxRef?.value?.getBoundingClientRect()
  let fileRef = bgImgRef.value.fileRef
  clientBox.height = fileRef.offsetHeight
  domRect.value = clientBox
}

/**
 * 图片加载完成后给imgBox上绑定onmousedown和onmouseup和onmousemove事件
 */
const currentIndex = ref(-1)
const imageLoaded = () => {
  setTimeout(getDomRect, 300)
  var oBox = hotViewImgBoxRef.value
  let pos = null
  var oDiv = null
  oBox.onmousedown = (ev) => {
    pos = new posData()
    const { scrollTop } = getScroll()
    const { scrollLeft } = getScrollElDialog()

    ev = window.event || ev
    //1.获取按下的点
    var x1 = ev.clientX - domRect.value.left + scrollLeft
    var y1 = ev.clientY - domRect.value.top + scrollTop

    // 2.创建div
    oDiv = document.createElement('div')
    oBox.appendChild(oDiv)
    flag.value = true

    oBox.onmousemove = function (e) {
      e = window.event || e
      var x2 = e.clientX - domRect.value.left + scrollLeft
      var y2 = e.clientY - domRect.value.top + scrollTop
      let left = ~~(x2 > x1 ? x1 : x2)
      oDiv.style.left = left + 'px'
      let top = ~~(y2 > y1 ? y1 : y2)
      oDiv.style.top = top + 'px'
      let width = Math.abs(x2 - x1)
      oDiv.style.width = width + 'px'
      let height = Math.abs(y2 - y1)
      oDiv.style.height = height + 'px'
      oDiv.className = 'hotViewDiv'
      pos = {
        ...pos,
        pageStyle: {
          width,
          height,
          left,
          top,
        },
      }
    }
    return false //解除在划动过程中鼠标样式改变的BUG
  }
  oBox.onmouseup = function () {
    if (pos && pos?.pageStyle?.width > 10 && pos?.pageStyle.height > 10) {
      if (flag.value) {
        pos.code = generateId('hotView')
        pos.title = `${componentsMapping['hotView'].name}_${pos.code}`
        hotView.value.push(pos)
        currentIndex.value = hotView.value.length - 1
      }
    }

    //清除hotViewImgBoxRef上的onmounsemove事件
    oBox.onmousemove = null

    if (oDiv) {
      try {
        oBox.removeChild(oDiv)
        oDiv = null
        flag.value = false
        pos = null
      } catch (e) {
        console.log('删除辅助div失败', e)
      }
    }
  }
}

/**
 * imgBox滚动量
 */
const getScroll = () => {
  return {
    scrollLeft: hotViewImgBoxRef.value?.scrollLeft,
    scrollTop: hotViewImgBoxRef.value?.scrollTop,
  }
}

/**
 * 整个弹窗是否有所滚动
 */
const hotViewElDialogRef = ref(null)
const getScrollElDialog = () => {
  return {
    scrollLeft: hotViewElDialogRef.value?.scrollLeft || 0,
    scrollTop: hotViewElDialogRef.value?.scrollTop || 0,
  }
}

/**
 * 选择某一个热区
 */
const chooseHotView = (index) => {
  currentIndex.value = index
}

/**
 * 触发某一个热区的mouseUp
 */
const mouseUp = () => {
  document.onmousemove = null
}

/**
 * 触发某一个热区的mouseDown
 */
const mouseDown = (e, index) => {
  const down = {
    clientX: e.clientX,
    clientY: e.clientY,
  }
  const { type } = e.srcElement.dataset
  let oldInfo = cloneDeep(hotView.value[index].pageStyle)
  currentIndex.value = index
  if (!document.onmousemove) {
    document.onmousemove = (e) => {
      e.preventDefault()
      const res = operationHotFunc[type]?.(e, down, oldInfo, domRect, index)
      if (!check(res)) return false
      hotView.value[index].pageStyle = res
    }
  }
}

/**
 * 操作热区的四条边
 */
const operationHotFunc = {
  move(e, down, oldInfo, domRect) {
    const left = e.clientX - down.clientX
    const top = e.clientY - down.clientY
    const setX = oldInfo.left + left
    const setY = oldInfo.top + top
    return {
      ...oldInfo,
      left:
        setX < 0
          ? 0
          : setX + oldInfo.width > domRect.width
          ? domRect.width - oldInfo.width
          : setX,
      top:
        setY < 0
          ? 0
          : setY + oldInfo.height > domRect.height
          ? domRect.height - oldInfo.height
          : setY,
    }
  },
  top(e, down, oldInFo) {
    const top = e.clientY - down.clientY
    return {
      ...oldInFo,
      height: oldInFo.height - top,
      top: top + oldInFo.top,
    }
  },
  bottom(e, down, oldInFo) {
    const top = e.clientY - down.clientY
    return {
      ...oldInFo,
      height: oldInFo.height + top,
    }
  },
  left(e, down, oldInFo) {
    const left = e.clientX - down.clientX
    const width = oldInFo.width - left
    const setX = left + oldInFo.left
    return {
      ...oldInFo,
      width,
      left: setX,
    }
  },
  right(e, down, oldInFo) {
    const left = e.clientX - down.clientX
    const width = oldInFo.width + left
    return {
      ...oldInFo,
      width,
    }
  },
}

/**
 * 检查是否超过box
 * @param {*} value
 */
const check = (value) => {
  if (!value) return
  const { left, top, width, height } = value
  return (
    width + left <= domRect.value.width &&
    left >= 0 &&
    width > 10 &&
    height + top <= domRect.value.height &&
    top >= 0 &&
    height > 10
  )
}

/**
 * 删除某一个热区
 */
const doDelete = (index) => {
  hotView.value.splice(index, 1)
  chooseHotView(hotView.value.length - 1)
}

/**
 * 热区类型选择
 */
const hotTypeChange = (e) => {
  if (e === 'form') {
    hotView.value[currentIndex.value].formData = {
      type: formTypeList[0].value, //下拉选择框，输入框，城市，日期
      key: '', //输入表单值对应的key
      attribute: new formTypeList[0].class(), //属性
    }
  } else {
    hotView.value[currentIndex.value].formData = null
  }
}

/**
 * 取消
 */
const close = () => {
  emit('update:visible', false)
}

/**
 * 确定
 */
const save = () => {
  emit('update:modelValue', hotView.value)
  emit('update:visible', false)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
