<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    style="width: 100%"
    v-bind="formConfig"
  >
    <slot></slot>
    <FormItemList
      v-if="init"
      :formData="valueData"
      :formList="formList"
      propKey=""
    ></FormItemList>
    <el-row v-if="showSubmitBtn || showCancelBtn" type="flex" justify="end">
      <el-button
        v-if="showCancelBtn"
        class="mr-10"
        type="info"
        plain
        @click="onCancel"
      >
        {{ options.cancelText || '取消' }}
      </el-button>
      <el-button
        v-if="showSubmitBtn"
        class="mr-10"
        type="primary"
        plain
        @click="onSubmit"
      >
        {{ options.submitText || '提交' }}
      </el-button>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, provide, ref, computed } from 'vue'
import { getFormObject, setMerge } from './utils/index'
import FormItemList from './components/formItemList/index.vue'
import { FormInstance } from 'element-plus'
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue: any
    formList: FormCreate.FormItemListType
    options?: any
    formConfig?: FormCreate.FormConfigProps
  }>(),
  {
    modelValue: () => ({}),
    formList: () => [],
    options: () => ({}),
    formConfig: () => ({ inline: false, gutter: '10', span: '4' }),
  },
)

provide('formConfig', props.formConfig)

const showCancelBtn = computed(() => {
  return props.options?.onCancel
})

const showSubmitBtn = computed(() => {
  return props.options?.onCancel
})

const initData = computed(() => {
  return props.options?.initDate !== false
})

//页面是否完成初始化
const init = ref(false)
onMounted(() => {
  if (initData.value) {
    getData()
  } else {
    init.value = true
  }
})

/**
 * 获取页面getData
 */
const getData = async () => {
  if (props?.options?.getData) {
    const val = await props.options.getData()
    handleData(val)
  } else {
    handleData()
  }
}

const valueData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

provide('formValue', valueData)

/**
 * 处理数据
 * @param {*} value
 */
const handleData = (value = props.modelValue) => {
  let obj = setMerge(value ?? {}, getFormObject(props.formList))
  valueData.value = obj
  init.value = true
}

/**
 * 获取表单元素
 */
const formRef = ref<FormInstance>()
const validate = () => {
  return formRef?.value && formRef.value.validate()
}

/**
 * 确定
 */
const onSubmit = () => {
  validate()?.then((res) => {
    console.log('最终数据', res)
    props.options?.onSubmit(props.modelValue)
  })
}

/**
 * 取消
 */
const onCancel = () => {
  props.options?.onCancel(props.modelValue)
}

defineExpose({ validate })
</script>
<style lang="scss" scoped></style>
