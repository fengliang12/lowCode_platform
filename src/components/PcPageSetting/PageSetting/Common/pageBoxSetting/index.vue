<template>
  <div class="flex">
    <el-form-item
      v-if="showSettingList.includes('width')"
      :label-width="formLabelWidth"
      label="宽度："
    >
      <el-input-number
        :min="0"
        v-model="borderDistance.width"
        :max="range.width - borderDistance.left"
      />
      <el-button class="ml10" v-if="ratio" @click="updateWH('width')"
        >根据高度设置</el-button
      >
    </el-form-item>
    <el-form-item
      :label-width="formLabelWidth"
      label="高度："
      v-if="showSettingList.includes('height')"
    >
      <el-input-number
        :min="0"
        v-model="borderDistance.height"
        :max="range.height - borderDistance.top"
      />
      <el-button class="ml10" v-if="ratio" @click="updateWH('height')"
        >根据宽度设置</el-button
      >
    </el-form-item>
    <el-form-item
      v-if="showSettingList.includes('left')"
      :label-width="formLabelWidth"
      label="左距："
    >
      <el-input-number
        :min="0"
        v-model="borderDistance.left"
        :max="range.width - borderDistance.width"
      />
    </el-form-item>
    <el-form-item
      v-if="showSettingList.includes('top')"
      :label-width="formLabelWidth"
      label="上距"
    >
      <el-input-number
        :min="0"
        v-model="borderDistance.top"
        :max="range.height - borderDistance.height"
      />
    </el-form-item>
    <el-form-item
      v-if="showSettingList.includes('radius')"
      :label-width="formLabelWidth"
      label="圆角"
    >
      <el-input-number
        :min="0"
        v-model="borderDistance.radius"
        :max="range.height - borderDistance.height"
      />
    </el-form-item>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { floor, isEmpty } from 'lodash-es'
import { onMounted, inject } from 'vue'
import PageBoxSettingData from './data'

const formLabelWidth = inject('formLabelWidth', 100)
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  range: {
    type: Object,
    default: () => ({}),
  },
  position: {
    type: String,
    default: 'top',
  },
  ratio: {
    type: Number,
    default: 0,
  },
  showSettingList: {
    type: Array,
    default: () => ['width', 'height', 'top', 'left', 'radius'],
  },
})
const emit = defineEmits(['update:modelValue'])

/**
 * 初始borderDistance
 */
const borderDistance = computed({
  get() {
    if (isEmpty(props.modelValue)) {
      emit('update:modelValue', new PageBoxSettingData())
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const updateWH = (type) => {
  if (type === 'width') {
    borderDistance.value.width = floor(
      borderDistance.value.height * props.ratio,
      2,
    )
  }
  if (type === 'height') {
    borderDistance.value.height = floor(
      borderDistance.value.width / props.ratio,
      2,
    )
  }
}
onMounted(() => {})
</script>
<style lang="scss" scoped></style>
