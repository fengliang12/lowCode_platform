<template>
  <div class="flex flex-1">
    <el-tabs
      :before-leave="beforeLeave"
      v-bind="props"
      class="h100 flex-1"
      v-model="activeName"
    >
      <el-tab-pane
        v-for="(pane, index) in tabsConfig"
        :key="index"
        v-bind="pane.props"
      >
        <FormCreate
          v-model="formValue"
          :ref="refFunc"
          :formList="pane.formList"
          :options="optionsValue"
        ></FormCreate>
        <el-button
          v-if="tabsConfig.length - 1 != Number(activeName)"
          @click="next()"
          >下一步</el-button
        >
        <el-button v-if="showSubmitBtn" @click="sub">{{
          options.submitText || '提交'
        }}</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import FormCreate from '../index.vue'
import { getFormObject, setMerge } from '../utils'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
  tabsConfig: FormCreate.tabsConfig
  props: any
  options: any
}>()

/**
 * 表单值
 */
const formValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * optionsValue
 */
const optionsValue = computed(() => {
  return {
    ...props.options,
    onSubmit: null,
    onCancel: null,
    getData: null,
    initData: false,
  }
})

/**
 * 按钮是否显示
 */
const showSubmitBtn = computed(() => {
  return props.options?.onSubmit
})

/**
 * unDisabledIndex
 */
const unDisabledIndex = computed(() => {
  const indexList: string[] = []
  props.tabsConfig.forEach((element, index) => {
    if (!element.props?.disable) {
      indexList.push(index.toString())
    }
  })
  return indexList
})
const activeName = ref('0')
const next = () => {
  const index = unDisabledIndex.value.indexOf(activeName.value)
  activeName.value = unDisabledIndex[index + 1]
}

onMounted(() => {
  getData()
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

/**
 * 处理数据
 */
const tabsConfigFormList = computed(() => {
  return props.tabsConfig.map((elem) => elem.formList).flat(1)
})
const handleData = (value = props.modelValue) => {
  emit(
    'update:modelValue',
    setMerge(value ?? {}, getFormObject(tabsConfigFormList.value)),
  )
}

/**
 * 表单校验,这里有疑问
 */
const refArr = ref<FormInstance[]>([])
const refFunc = (el: FormInstance) => {
  refArr.value.push(el)
}
const beforeLeave = (name: string) => {
  const arr = Object.keys(props.tabsConfig)
  const index = arr.indexOf(name)
  const checkArr = name === 'endSub' ? arr : arr.slice(0, index)
  return Promise.all(
    checkArr.map((elem) => {
      if (!refArr.value?.[`formCreate${elem}`]) {
        return Promise.resolve(true)
      }
      return refArr.value?.[`formCreate${elem}`].validate().catch(() => {
        activeName.value = elem
        return Promise.reject()
      })
    }),
  )
}

/**
 * 提交数据
 */
const sub = () => {
  beforeLeave('endSub').then(() => {
    props.options.onSubmit(formValue.value)
  })
}
</script>
<style lang="scss" scoped></style>
