<template>
  <FormCreate v-model="valueData" :formList="formList"></FormCreate>
</template>

<script setup>
import { computed, watch } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { onMounted, reactive } from 'vue'
import { formTypeKeyMapClass, formTypeList } from './common/formTypeList'
import { pageValueData } from '../setData/data'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const valueData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 公共的组件
 */
const commonFormItem = [
  //输入提示
  {
    field: 'placeholder',
    type: 'el-input',
    title: '输入提示',
  },
  {
    field: 'placeholderStyle',
    type: 'el-input',
    title: '输入提示样式',
  },
  {
    field: 'disabled',
    type: 'el-switch',
    title: '是否禁用',
    props: {
      activeText: '是',
      inactiveText: '否',
    },
  },
]

/**
 * 表单配置
 */
const formList = reactive([
  {
    field: 'key',
    title: 'key值',
    type: 'SelectKey',
  },
  {
    field: 'type',
    title: '表单类型',
    type: 'el-select',
    props: {
      placeholder: '请选择类型',
    },
    options: formTypeList,
    on: {
      change: (e) => {
        valueData.value.attribute = new formTypeKeyMapClass[e].class()
        valueData.value.key = formTypeKeyMapClass[e].defaultKey
      },
    },
    control: [
      {
        handle(val) {
          return val === 'Input'
        },
        formList: [
          ...commonFormItem,
          {
            field: 'attribute',
            type: 'object',
            formList: [
              {
                field: 'pageValue',
                title: '默认值',
                type: 'setData',
                props: {
                  usValue: true,
                  span: 24,
                },
              },
              {
                field: 'type',
                title: '输入框类型',
                type: 'el-select',
                options: [
                  {
                    label: '文本(text)',
                    value: 'text',
                  },
                  {
                    label: '数字(number)',
                    value: 'number',
                  },
                  {
                    label: '身份证(idcard)',
                    value: 'idcard',
                  },
                  {
                    label: '带小数点(digit)',
                    value: 'digit',
                  },
                  {
                    label: '昵称(nickname)',
                    value: 'nickname',
                  },
                ],
              },
              {
                field: 'password',
                type: 'el-switch',
                title: '是否为密码',
                props: {
                  activeText: '是',
                  inactiveText: '否',
                },
              },
              {
                field: 'maxlength',
                type: 'el-input-number',
                title: '最大长度',
                tips: '输入的最大长度-1为不限制长度',
              },
              {
                field: 'focus',
                type: 'el-switch',
                title: '自动获取焦点',
                props: {
                  activeText: '是',
                  inactiveText: '否',
                },
              },
              {
                field: 'confirmType',
                type: 'el-select',
                title: '键盘右下角按钮的文字',
                options: [
                  {
                    label: '发送',
                    value: 'send',
                  },
                  {
                    label: '搜索',
                    value: 'search',
                  },
                  {
                    label: '下一个',
                    value: 'next',
                  },
                  {
                    label: '前往',
                    value: 'go',
                  },
                  {
                    label: '完成',
                    value: 'done',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        handle(type) {
          return type == 'Date'
        },
        formList: [
          ...commonFormItem,
          {
            field: 'attribute',
            type: 'object',
            formList: [
              {
                //默认值
                type: 'setData',
                field: 'pageValue',
                title: '默认值',
                props: {
                  usValue: true,
                  span: 24,
                },
              },
              {
                field: 'start',
                type: 'ADate',
                title: '开始时间',
              },
              {
                field: 'end',
                type: 'ADate',
                title: '结束时间',
              },
            ],
          },
        ],
      },
      {
        handle(type) {
          return type == 'OmsAddress'
        },
        formList: [
          {
            type: 'object',
            field: 'attribute',
            formList: [
              ...commonFormItem,
              {
                type: 'CascaderDefault',
                field: 'valueList',
                title: '多组默认数据配置',
                props: {
                  labelMap: {
                    label: '多组默认数据配置',
                    province: '省份',
                    city: '城市',
                    district: '地区',
                    postcode: '地区code',
                  },
                },
              },
            ],
          },
        ],
      },
      {
        handle(type) {
          return type == 'Cascader'
        },
        formList: [
          {
            type: 'object',
            field: 'attribute',
            formList: [
              {
                type: 'el-select',
                field: 'type',
                title: '级联选择器类型',
                options: [
                  {
                    label: '自定义(custom)',
                    value: 'custom',
                  },
                  {
                    label: '动态数据(pageData)',
                    value: 'pageData',
                  },
                ],
                on: {
                  change: (v) => {
                    valueData.value.attribute = new formTypeKeyMapClass[
                      valueData.value.type
                    ].class(v)
                  },
                },
                default: 'custom',
                control: [
                  {
                    handle: (type) => {
                      return type == 'custom'
                    },
                    formList: [
                      {
                        type: 'CascaderTable',
                        field: 'cascaderList',
                        title: '设置选项',
                      },
                      {
                        type: 'CascaderDefault',
                        field: 'valueList',
                        title: '多组默认数据配置',
                        props: {},
                      },
                    ],
                  },
                  {
                    handle: (type) => {
                      return type == 'pageData'
                    },
                    formList: [
                      {
                        type: 'setData',
                        field: 'cascaderList',
                        title: '设置选项',
                      },
                      {
                        field: 'dataType',
                        type: 'el-select',
                        title: '级联数据类型',
                        options: [
                          {
                            label: '树形结构(treeData)',
                            value: 'treeData',
                          },
                          {
                            label: '对象结构(objectData)',
                            value: 'objectData',
                          },
                        ],
                      },
                      {
                        field: 'props',
                        type: 'el-input',
                        title: '数据格式化方法',
                        tips: '树形结构 默认 (展示,值,子选项)label,value,children\n对象结构(一级,二级,三级)value1,value2,value3',
                      },
                      {
                        field: 'maxlength',
                        type: 'el-input-number',
                        title: '层级数',
                        props: {
                          min: 0,
                        },
                        on: {
                          change: (value) => {
                            valueData.value.attribute.valueList = new Array(
                              value,
                            )
                              .fill(null)
                              .map((i, index) => ({
                                key: `value${index}`,
                                pageValue: new pageValueData({
                                  valueType: 'pageData',
                                }),
                              }))
                          },
                        },
                      },
                      {
                        type: 'CascaderDefault',
                        field: 'valueList',
                        title: '多组默认数据配置',
                        props: {},
                      },
                    ],
                  },
                ],
              },
              {
                field: 'showSelectedValue',
                type: 'el-switch',
                title: '是否回显值',
                props: {
                  activeText: '是',
                  inactiveText: '否',
                },
              },
              ...commonFormItem,
            ],
          },
        ],
      },
    ],
  },
])

/**
 * 级联层级
 */
const cascadeLevel = computed(() => {
  if (valueData.value.type === 'Cascader') {
    if (valueData.value.attribute?.type == 'custom') {
      return getMaxFloor(valueData.value.attribute?.cascaderList || [])
    } else {
      return valueData.value?.attribute?.cascadeLevel || 0
    }
  }
  return 0
})

/**
 * 获取最大的层级数
 * @param {*} treeData
 */
const getMaxFloor = (treeData) => {
  let max = 0
  function each(data = [], floor) {
    data.forEach((e) => {
      if (floor > max) {
        max = floor
      }
      if (e.children && e.children.length > 0) {
        each(e.children, floor + 1)
      }
    })
  }
  each(treeData, 1)
  return max
}

/**
 * 监听
 */
watch(cascadeLevel, (v, o) => {
  if (valueData.value?.type === 'Cascader') {
    if (
      !valueData.value?.attribute?.valueList ||
      valueData.value?.attribute?.valueList.length == 0
    ) {
      valueData.value.attribute.valueList = new Array(v)
        .fill(null)
        .map((i, index) => ({
          key: `value${index}`,
          pageValue: new pageValueData({ valueType: 'pageData' }),
        }))
    } else if (v > o && o == valueData.value.attribute.valueList.length) {
      const key = `value${valueData.value.attribute?.valueList?.length}`
      valueData.value.attribute.valueList.push({
        key,
        pageValue: new pageValueData({ valueType: 'pageData' }),
      })
    } else if (v < o && o == valueData.value.attribute.valueList.length) {
      valueData.value.attribute.valueList.splice(
        valueData.value.attribute.valueList.length - 1,
        1,
      )
    }
  }
})

onMounted(() => {})
</script>
<style lang="scss" scoped></style>
