<template>
  <div>
    <upload-file :on-success="successCallback" multiple></upload-file>
    <Draggable
      :list="modelValue"
      animation="500"
      item-key="$index"
      class="draggable_box"
    >
      <template #item="{ element, index }">
        <ShowFile
          :src="element.imageSetting.imgUrl"
          :key="index"
          @edit="editChild(index)"
          @del="delChild(index)"
        ></ShowFile>
      </template>
    </Draggable>

    <el-dialog v-model="dialogVisible" append-to-body width="80%">
      <ModuleSetting
        :parents="parents"
        @success="uploadSuccess"
        v-model="modelValue[currentIndex]"
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
import { ref } from 'vue'
import Draggable from 'vuedraggable'
import ShowFile from '../../../Common/showFile/index.vue'
import { setModule } from '../../../data'
import ModuleSetting from '../index.vue'
import { usePageSetupStore } from '@/store'
import setItemsMap from '../../../Handle/setItemsMap.js'
import bus from '@/utils/bus'

const props = defineProps(['modelValue', 'parents'])
const pageSetupStore = usePageSetupStore()

/**
 * 图片上传回调
 */
const successCallback = ({ url }) => {
  const data = setModule({ moduleType: 'hot' })
  data.imageSetting.imgUrl = url
  props.modelValue.push(data)
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
const uploadSuccess = () => {}
</script>
<style lang="scss" scoped>
.draggable_box {
  display: flex;
  flex-wrap: wrap;
}
</style>
