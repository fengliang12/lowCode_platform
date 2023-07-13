<template>
  <el-form-item
    v-if="!hide"
    :label="formItem.title"
    :prop="prop"
    :rules="formItem.rules"
  >
    <component
      :is="formItem.type"
      :ref="formItem.ref"
      v-model="valueData"
      v-model:url="valueData"
      :field1="formData[formItem?.field1 || '']"
      v-model:color="valueData"
      v-model:nodes="valueData"
      v-bind="{ clearable: true, filterable: true, ...formItem.props }"
      :options="formItem.options"
      v-on="{ ...formItem?.on }"
    >
      <template
        v-if="
          formItem.type === 'el-cascader' &&
          formItem.options &&
          formItem.options.length
        "
        #default="{ node, data }"
      >
        <span>{{ data.label }}</span>
      </template>

      <template
        v-if="
          formItem.type !== 'el-cascader' &&
          formItem.options &&
          formItem.options.length
        "
      >
        <FOptionList
          :type="formItem.type"
          :options="formItem.options"
        ></FOptionList>
      </template>
    </component>
    <!-- 提示 -->
    <template v-if="formItem.tips">
      <el-tooltip :content="formItem.tips" placement="top-start">
        <el-icon style="margin-left: 10px"><WarningFilled /></el-icon>
      </el-tooltip>
    </template>
    <template v-if="formItem.button">
      <el-button style="margin-left: 10px" @click="formItem.btnClick">
        {{ formItem.button }}
      </el-button>
    </template>
  </el-form-item>
  <template v-if="data.controlFormList.length > 0">
    <FormItemList
      v-for="(childFormList, index) in data.controlFormList"
      :key="index"
      :groupIndex="index"
      :formList="childFormList"
      :formData="formData"
      :propKey="propKey"
    />
  </template>
</template>

<script setup lang="ts">
import { computed, reactive, watch, inject, onMounted } from 'vue'
import FOptionList from '../../public/FOptionList/index.vue'
import FormItemList from '../formItemList/index.vue'

import { get } from 'lodash-es'

const formValue: any = inject('formValue')

const props = withDefaults(
  defineProps<{
    formData: any
    formItem: FormCreate.FormItemType
    propKey: string
    groupIndex?: number
  }>(),
  {
    formData: () => ({}),
    propKey: '',
  },
)

const data = reactive({
  controlFormList: [],
})

const hide = computed(() => {
  return (
    !!props?.formItem?.hideOption?.includes('hide') ||
    props?.formItem?.hideOption?.includes('form')
  )
})

const prop = computed(() => {
  return props.propKey
    ? `${props.propKey}.${props.formItem.field}`
    : props.formItem.field
})

/**
 * valueData值
 */
const valueData = computed({
  get() {
    return props.formData[props.formItem.field]
  },
  set(val) {
    props.formData[props.formItem.field] = val
  },
})

watch(
  () => valueData.value,
  (val) => {
    if (!props.formItem?.control?.length) return
    data.controlFormList = props.formItem.control.map((elem: any) => {
      if (elem.handle.call(null, val)) {
        return elem.formList
      }
    })
  },
  { immediate: true },
)

/**
 *处理effect
 */
onMounted(() => {
  handleEffect()
  handleUpdate()
})

/**
 * 发送请求，添加到options
 */
const handleEffect = async () => {
  if (!props?.formItem?.effect) return
  // eslint-disable-next-line no-unsafe-optional-chaining
  let { fetch, param, to = 'options', parse } = props?.formItem?.effect
  if (!fetch) return
  const data = await fetch(param)
  props.formItem[to] = parse ? parse(data) : data
}

const handleUpdate = () => {
  const valueList: any = []
  const { link, update } = props.formItem
  if (!update) return
  if (link?.length) {
    link.forEach((elem, index) => {
      if (elem && elem.includes('{{')) {
        //包含{{获取分享参数key值
        elem = elem.replace(/{{(\S*?)}}/gm, (a, b) => {
          return get(props, `${b}`) ?? b
        })
      }
      watch(
        () => formValue.value[elem],
        (val) => {
          valueList[index + 1] = val
          update(valueList, props.formItem)
        },
      )
    })
  }

  watch(
    () => valueData.value,
    (val) => {
      const { update } = props.formItem
      valueList[0] = val
      update &&
        update(
          valueList?.length === 1 ? valueList[0] : valueList,
          props.formItem,
        )
    },
  )
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
  flex-wrap: nowrap;
}
</style>
