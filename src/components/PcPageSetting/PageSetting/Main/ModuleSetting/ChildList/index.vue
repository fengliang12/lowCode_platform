<template>
  <div>
    <upload-file :on-success="successCallback"></upload-file>
    <Draggable
      :list="ChildListData"
      animation="500"
      item-key="$index"
      class="draggable_box"
    >
      <template #item="{ element, index }">
        <div class="moreImg">
          <ShowFile
            :src="element.imageSetting?.imgUrl"
            :key="index"
            @edit="editChild(index)"
            @del="delChild(index)"
          ></ShowFile>
          <div class="showFile CommonBox">
            <Common class="Common" :data="element" onlyShow></Common>
          </div>
        </div>
      </template>
    </Draggable>

    <el-dialog v-model="dialogVisible" append-to-body width="80%">
      <ModuleSetting
        :parents="parents"
        @success="uploadSuccess"
        v-model="ChildListData[currentIndex]"
      />
      <template #footer>
        <el-button @click="dialogVisible = false" type="primary">
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Draggable from 'vuedraggable'
import ShowFile from '../../../Common/showFile/index.vue'
import Common from '../../Template/Common/index.vue'
import { setModule } from '../../ModuleSetting/data'
import ModuleSetting from '../index.vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import setItemsMap from '../../../Handle/setItemsMap.js'
import bus from '@/utils/bus'

const emit = defineEmits(['update:modelValue', 'success'])
const props = defineProps(['modelValue', 'parents'])
const pageSetupStore = usePageSetupStore()

const ChildListData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
/**
 * 图片上传回调
 */
const successCallback = ({ url, fileType, el, ratio }) => {
  let { width, height } = el
  const data = setModule({ moduleType: 'hot', width, height })
  data.imageSetting.imgUrl = url
  data.multimediaType = fileType === 'image' ? 'img' : fileType
  props.modelValue.push(data)
  emit('success', {
    ratio,
  })
  bus.emit('refreshElTree')
}

/**
 * 编辑
 */
const dialogVisible = ref(false)
const currentIndex = ref(-1)
const editChild = (index) => {
  currentIndex.value = index
  dialogVisible.value = true
}

/**
 * 删除
 */
const delChild = (index) => {
  pageSetupStore.setPageItemsMap({
    itemsMap: setItemsMap(
      props.modelValue[index],
      pageSetupStore.itemsMap,
      'delete',
    ),
  })
  props.modelValue.splice(index, 1)
}

/**
 * 弹窗中图片上传成功回调
 */
const uploadSuccess = (e) => {
  emit('success', e)
}
</script>
<style lang="scss" scoped>
.moreImg {
  border: 1px solid #999;
  position: relative;
  width: 178px;
  height: 178px;
  margin: 10px 10px 10px 0;
  overflow: hidden;
}

.draggable_box {
  display: flex;
  flex-wrap: wrap;
}

.showFile {
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.Common {
  transform-origin: top left;
  transform: scale(0.6) !important;
}
</style>
../data
