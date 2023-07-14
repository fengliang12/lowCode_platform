<template>
  <div class="rules_content">
    <template v-if="hasRules">
      <div v-for="(item, index) in rules" :key="item.id" class="vhCenter">
        <div>
          <div class="mb10 vhCenter">
            <div class="w100">必填：</div>
            <el-select v-model="item.required" class="w150">
              <el-option label="是" :value="true" />
              <el-option label="否" :value="false" />
            </el-select>
          </div>
          <div v-if="item.required" class="mb10 vhCenter">
            <div class="w100">类型：</div>
            <el-select
              v-model="item.type"
              class="w150"
              clearable
              placeholder="请选择"
            >
              <el-option label="手机号" value="mobile" />
            </el-select>
          </div>
          <div v-if="item.required" class="mb10 vhCenter">
            <div class="w100">消息：</div>
            <el-input
              class="w150"
              v-model="item.message"
              placeholder="请输入消息"
            />
          </div>
        </div>
        <div class="icon-box">
          <div class="mb10">
            <el-tooltip effect="dark" content="新增" placement="top">
              <el-button
                type="primary"
                :icon="Plus"
                circle
                @click="addRule(index + 1)"
              />
            </el-tooltip>
          </div>
          <div>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                :icon="Delete"
                circle
                @click="delRule(index)"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
    </template>
    <div v-else>
      <el-button @click="addRule(0)">新增校验规则</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// PageApiRule {
//   required (boolean, optional): 是否请求 ,
//   type (string, optional): 类型
//   message (string, optional): 消息 ,
// }
import { computed } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])
const rules = computed({
  get() {
    if (!props.modelValue) {
      emit('update:modelValue', [])
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 判断当前rule是否有值
 */
const hasRules = computed(() => {
  return rules.value?.length > 0
})

/**
 * 添加规则
 */
const addRule = (index: number) => {
  rules.value.splice(index, 0, {
    required: true,
    type: '',
    message: '',
  })
}

/**
 * 删除规则
 * @param {*} index
 */
const delRule = (index: number) => {
  rules.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
