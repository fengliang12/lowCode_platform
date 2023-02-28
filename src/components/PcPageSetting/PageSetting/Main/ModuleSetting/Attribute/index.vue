<template>
  <el-form>
    <div class="mb10 code">
      code : <span>{{ valueData?.code }}</span>
    </div>
    <FormCreate v-model="valueData" :formItemList="formItemList"></FormCreate>
    <el-divider>限制条件</el-divider>
    <el-form-item label="组件有效期" prop="from">
      <el-date-picker
        v-model="termOfValidity"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      ></el-date-picker>
    </el-form-item>
    <PageModuleLimit v-model="valueData.moduleLimit"></PageModuleLimit>
    <el-button @click="showConditionsForExecution">其他条件判断</el-button>
    <el-divider>组件参数</el-divider>
    <el-form-item label="组件参数">
      <!--编辑api参数,有icon,#016ef8,#bfbfbf-->
      <el-icon
        :size="30"
        :color="paramsHasValue ? '#339900' : '#bbbbbb'"
        @click="showEditParameters()"
        ><List
      /></el-icon>
    </el-form-item>
  </el-form>
  <!-- 编辑条件 -->
  <ConditionsForExecution
    ref="conditionsForExecutionRef"
    @confirm="conditionsForExecutionChange"
  ></ConditionsForExecution>

  <!-- 组件参数 -->
  <EditParameters
    ref="editParameters"
    @confirmParameters="editParametersChange"
  ></EditParameters>
</template>

<script setup>
import FormCreate from '@/components/FormCreate/index.vue'
import EditParameters from '../../../Common/editParameters/index.vue'
import PageModuleLimit from '../../../Common/pageModuleLimit/index.vue'
import { reactive, ref } from 'vue'
import { computed } from 'vue'
import ConditionsForExecution from '../../../Common/conditionsForExecution/index.vue'

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
 * 属性
 */
const formItemList = reactive([
  {
    field: 'title',
    title: '标题',
    type: 'el-input',
  },
  {
    field: 'initModuleViewHide',
    title: '初始化隐藏',
    type: 'el-select',
    defaultValue: false,
    options: [
      {
        label: '开启',
        value: true,
      },
      {
        label: '关闭',
        value: false,
      },
    ],
  },
])

/**
 * 是否有参数
 */
const paramsHasValue = computed(() => props.modelValue.params?.length)

/**
 * 日期选择结果
 */
const termOfValidity = computed({
  get() {
    return [props.modelValue.from, props.modelValue.to]
  },
  set(value) {
    props.modelValue.from = value?.[0]
    props.modelValue.to = value?.[1]
  },
})

/**
 * 点击显示页面参数配置弹出
 */
const editParameters = ref(null)
const showEditParameters = () => {
  editParameters.value.show({
    params: props.modelValue?.params || [],
    type: 'multiLevel',
  })
}

/**
 * 点击显示条件编辑
 */
const conditionsForExecutionRef = ref(null)
const showConditionsForExecution = () => {
  conditionsForExecutionRef.value.show(props.modelValue.conditionsForExecution)
}

/**
 *条件回调
 */
const conditionsForExecutionChange = () => {}

/**
 * 页面参数回调
 */
const editParametersChange = (paramList) => {
  props.modelValue.params = paramList
}
</script>

<style lang="scss" scoped>
.code {
  font-size: 18px;
}
</style>
