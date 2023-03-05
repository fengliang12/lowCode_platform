<template>
  <div v-if="modelValue">
    <el-row>
      <el-col :span="12">
        <el-form-item :label-width="formLabelWidth" label="图片/视频/音频">
          <upload-file
            v-model:url="modelValue.imgUrl"
            :on-success="uploadSuccessCallback"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      :label-width="formLabelWidth"
      label="图片类型"
      v-if="['video', 'img'].includes(modelValue.multimediaType)"
    >
      <el-select
        v-model="modelValue.imgType"
        placeholder="请选择图片类型"
        size="small"
        style="width: 110px"
      >
        <el-option label="普通图片" value="common" />
        <el-option label="热区" value="hot" />
      </el-select>
      <el-button
        v-if="modelValue.imgType === 'hot'"
        class="ml10"
        size="small"
        type="primary"
        plain
        @click="setShowHotView"
      >
        绘制热区
      </el-button>
    </el-form-item>

    <!-- 图片配置 -->
    <el-form-item
      :label-width="formLabelWidth"
      label="显示图片配置"
      v-if="['img'].includes(modelValue.multimediaType)"
    >
      <el-switch v-model="showImageConfig" @change="showImageConfigChange">
      </el-switch>
    </el-form-item>
    <FormCreate
      v-if="showImageConfig"
      v-model="modelValue.imageConfig"
      :formItemList="imageConfigFormList"
    ></FormCreate>

    <!-- 位置宽度配置 -->
    <PageBoxSetting
      v-if="showPageBoxSetting"
      v-model="modelValue.borderDistance"
      :position="modelValue.position"
      :showSettingList="$attrs.showSettingList"
      :ratio="modelValue.ratio"
      :range="{
        width: 750,
        height: 1000,
      }"
    />

    <!-- 热区模块 -->
    <HotView
      v-if="showHotView"
      v-model="modelValue.hotModuleSettings"
      v-model:visible="showHotView"
      :imgUrl="modelValue.firstFrameVideo || modelValue.imgUrl"
    />
  </div>
</template>

<script setup>
// 还欠缺图片配置，视频配置，播放配置等功能
import { computed } from 'vue'
import { inject, ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageBoxSetting from '../pageBoxSetting/index.vue'
import HotView from '../hotView/index.vue'
import { handleUploadSuccessInfo } from '../../Handle/upload'
import FormCreate from '@/components/FormCreate/index.vue'
import { imageConfigData, imageConfigFormList } from './data'

const props = defineProps(['modelValue', 'showPageBoxSetting'])
const emit = defineEmits(['success'])
const formLabelWidth = inject('formLabelWidth', 100)

/**
 * 文件上传成功后的回调
 * @param {*} e
 */
const uploadSuccessCallback = (e) => {
  handleUploadSuccessInfo(props.modelValue, e, props.showPageBoxSetting)
  emit('success', e)
}

/**
 * 点击绘制热区按钮
 */
const showHotView = ref(false)
const setShowHotView = () => {
  if (!props.modelValue.imgUrl) {
    ElMessage.error('请先上传文件')
    return
  }
  showHotView.value = true
}

/**
 * 图片配置
 */
const showImageConfig = computed(() => {
  return props.modelValue.imageConfig === null ? false : true
})
const showImageConfigChange = (val) => {
  showImageConfig.value = val
  props.modelValue.imageConfig = val ? imageConfigData : null
}
</script>
<style lang="scss" scoped></style>
