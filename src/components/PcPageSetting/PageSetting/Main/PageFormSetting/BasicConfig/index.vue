<template>
  <div class="flex">
    <el-form ref="form" :model="modelValue" label-width="100px">
      <el-form-item label="编码：">
        <el-input v-model="modelValue.id" disabled />
      </el-form-item>
      <el-form-item
        label="组件标题："
        prop="title"
        :rules="[
          { required: true, message: '请输入组件标题', trigger: 'blur' },
        ]"
      >
        <el-input v-model="modelValue.title" placeholder="请输入活动名称" />
      </el-form-item>
      <el-form-item label="有效时间">
        <el-date-picker
          v-model="activeTime"
          class="width-full"
          type="datetimerange"
          from="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-switch
          v-model="modelValue.active"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="配置类型页：">
        <el-switch
          v-model="modelValue.homePage"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <template v-if="modelValue.homePage">
        <el-form-item
          label="页面类型"
          prop="type"
          :rules="[
            { required: true, message: '请输入页面类型', trigger: 'blur' },
          ]"
        >
          <el-select
            v-model="modelValue.type"
            clearable
            filterable
            placeholder="请选择页面类型"
          >
            <el-option
              v-for="item in pageSetupStore.pageSettingConstant.pageSettingType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面优先级：">
          <el-input-number :min="0" v-model="modelValue.priority" />
          <el-tooltip
            content="（用于排序越大越优先级越高）"
            placement="top-start"
          >
            <i class="el-icon-warning-outline ml10"></i>
          </el-tooltip>
        </el-form-item>
      </template>
      <el-form-item label="能否分享">
        <el-switch
          v-model="modelValue.shareFlag"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>
      <!-- 能否分享 -->
      <template v-if="modelValue.shareFlag">
        <el-form-item label="分享标题：">
          <el-input
            v-model="modelValue.shareSetting.title"
            placeholder="默认分享当前页面标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="分享路径：">
          <el-input
            v-model="modelValue.shareSetting.path"
            placeholder="默认分享当前页面"
          ></el-input>
          <el-icon
            :size="30"
            :color="shareParamsHasValue ? '#409eff' : '#bbbbbb'"
            class="ml10"
            @click="showEditParameters('share')"
            ><Postcard
          /></el-icon>
        </el-form-item>
        <el-form-item label="分享图片：">
          <upload-file
            v-model:url="modelValue.shareSetting.imageUrl"
            placeholder="默认当前页顶部截图"
            initFileType="image"
          ></upload-file>
        </el-form-item>
      </template>

      <!-- 页面参数 -->
      <el-form-item label="页面参数">
        <el-icon
          :size="30"
          :color="paramsHasValue ? '#409eff' : '#bbbbbb'"
          @click="showEditParameters('page')"
          ><Postcard
        /></el-icon>
      </el-form-item>

      <el-form-item label="描述：">
        <el-input
          v-model="modelValue.desc"
          :autosize="{ minRows: 3 }"
          type="textarea"
          placeholder="请输入描述"
        />
      </el-form-item>
    </el-form>

    <!-- 参数弹窗 -->
    <EditParameters
      ref="editParameters"
      @confirmParameters="editParametersChange"
    ></EditParameters>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import EditParameters from '../../../Common/editParameters/index.vue'
import type { FormInstance } from 'element-plus'

const pageSetupStore = usePageSetupStore()
const props = defineProps(['modelValue'])
provide('formLabelWidth', 100)

/**
 * 判断页面参数是否有值
 */
const paramsHasValue = computed(() => {
  return pageSetupStore.pageNewParams?.length > 0
})
const shareParamsHasValue = computed(() => {
  return props.modelValue.shareSetting?.shareParams?.length > 0
})

//活动时间
const activeTime = computed({
  get() {
    return [props.modelValue.form, props.modelValue.to]
  },
  set(val) {
    props.modelValue.from = val[0]
    props.modelValue.to = val[1]
  },
})

/**
 * 点击显示页面参数配置弹出
 */
const editParameters = ref<InstanceType<typeof EditParameters> | null>(null)
const paramsType = ref('')
const showEditParameters = (type: string) => {
  paramsType.value = type
  let params =
    type === 'page'
      ? pageSetupStore?.pageNewParams
      : props.modelValue?.shareSetting?.shareParams
  editParameters.value?.show({
    params: params ?? [],
    type: 'multiLevel',
  })
}

/**
 * 获取页面参数和分享编辑的结果
 */
const editParametersChange = (paramList: never[]) => {
  if (!paramList) paramList = []
  if (paramsType.value === 'page') {
    pageSetupStore.setPageNewParams(paramList)
  } else if (paramsType.value === 'share') {
    props.modelValue.shareSetting.shareParams = paramList
  }
}

/**
 * 表单校验
 */
const form = ref<FormInstance | null>(null)
const emit = defineEmits(['update:activeName'])
const next = async ({ check = false, activeName = 'counter' }) => {
  const valid = await form.value?.validate().catch(() => false)
  if (!valid) {
    return check ? Promise.reject(false) : false
  }
  if (!check) {
    emit('update:activeName', activeName)
  }
}

//对外暴露的函数
defineExpose({ next })
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}

:deep(.el-form-item__content) {
  flex-wrap: nowrap;
}
</style>
