<template>
  <FormCreate v-model="navigationBarData" :formList="formComponentsList">
  </FormCreate>
</template>

<script setup>
import { reactive } from 'vue'
import FormCreate from '@/components/formCreate/index.vue'
import { computed } from 'vue'
import NavigationBar from './data'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const navigationBarData = computed({
  get() {
    if (!props.modelValue) {
      emit('update:modelValue', new NavigationBar())
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 动态组件列表
 */
const formComponentsList = reactive([
  {
    divider: '自定义导航',
    field: 'show',
    type: 'el-switch',
    title: '显示标题栏',
  },
  {
    field: 'back',
    type: 'el-switch',
    title: '是否返回',
  },
  {
    field: 'title',
    type: 'el-input',
    title: '标题',
  },
  {
    field: 'titleColor',
    type: 'el-color-picker',
    title: '标题颜色',
    props: {
      'show-alpha': true,
    },
  },
  {
    field: 'titleImage',
    type: 'upload-file',
    title: '标题图片',
  },
  {
    field: 'backgroundColor',
    type: 'el-color-picker',
    title: '导航背景色',
    props: {
      'show-alpha': true,
    },
  },
  {
    field: 'backgroundImage',
    type: 'upload-file',
    title: '导航背景图',
  },
  {
    field: 'fill',
    type: 'el-switch',
    title: '是否填充',
  },
  {
    field: 'statusBarColor',
    type: 'el-select',
    title: '状态栏颜色',
    props: {
      clearable: true,
      placeholder: '请选择',
    },
    options: [
      {
        value: '#000000',
        label: '黑色',
      },
      {
        value: '#ffffff',
        label: '白色',
      },
    ],
  },
  {
    field: 'backgroundColorOpacity',
    type: 'el-switch',
    title: '滚动背景渐变',
  },
  {
    field: 'backgroundColorOpacityDistance',
    type: 'el-input',
    title: '滚动渐变距离',
  },
])
</script>
<style lang="scss" scoped></style>
