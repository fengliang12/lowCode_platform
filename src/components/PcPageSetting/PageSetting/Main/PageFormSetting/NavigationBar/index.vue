<template>
  <FormCreate v-model="navigationBarData" :formItemList="formItemList">
  </FormCreate>
</template>

<script setup>
import { reactive } from 'vue'
import FormCreate from '@/components/formCreate/index.vue'
import { computed } from '@vue/reactivity'
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
  }
})

/**
 * 动态组件列表
 */
const formComponentsList = reactive([
  {
    divider: '自定义导航',
    key: 'show',
    component: 'el-switch',
    label: '显示标题栏'
  },
  {
    key: 'back',
    component: 'el-switch',
    label: '是否返回'
  },
  {
    key: 'title',
    component: 'el-input',
    label: '标题'
  },
  {
    key: 'titleColor',
    component: 'el-color-picker',
    label: '标题颜色',
    props: {
      'show-alpha': true
    }
  },
  {
    key: 'titleImage',
    component: 'upload-file',
    label: '标题图片'
  },
  {
    key: 'backgroundColor',
    component: 'el-color-picker',
    label: '导航背景色',
    props: {
      'show-alpha': true
    }
  },
  {
    key: 'backgroundImage',
    component: 'upload-file',
    label: '导航背景图'
  },
  {
    key: 'fill',
    component: 'el-switch',
    label: '是否填充'
  },
  {
    key: 'statusBarColor',
    component: 'el-select',
    label: '状态栏颜色',
    props: {
      clearable: true,
      placeholder: '请选择'
    },
    child: [
      {
        component: 'el-option',
        optionList: [
          {
            value: '#000000',
            label: '黑色'
          },
          {
            value: '#ffffff',
            label: '白色'
          }
        ]
      }
    ]
  },
  {
    key: 'backgroundColorOpacity',
    component: 'el-switch',
    label: '滚动背景渐变'
  },
  {
    key: 'backgroundColorOpacityDistance',
    component: 'el-input',
    label: '滚动渐变距离'
  }
])

/**
 * 处理FormComponentsList
 */
const formItemList = computed(() => {
  return formComponentsList.map((elem) => {
    return {
      type: elem.component,
      field: elem.key,
      title: elem.label,
      ...elem,
      options: elem?.child?.[0]?.optionList.length
        ? elem?.child?.[0]?.optionList
        : []
    }
  })
})
</script>
<style lang="scss" scoped></style>
