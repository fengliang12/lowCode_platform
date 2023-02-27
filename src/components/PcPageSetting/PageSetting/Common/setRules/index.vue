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
            <el-button type="primary" @click="addRule(index + 1)"
              >新增</el-button
            >
          </div>
          <div>
            <el-button type="success" @click="deleteRule(index)"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </template>
    <div v-else>
      <el-button @click="addRule(0)">新增校验规则</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const rules = computed({
  get() {
    if (!props.modelValue) {
      emit('update:modelValue', [])
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

/**
 * 判断当前rule是否有值
 */
const hasRules = computed(() => {
  return rules.value.length > 0
})

/**
 * 添加规则
 */
const addRule = (index) => {
  rules.value.splice(index, 0, {
    required: true,
    type: '',
    message: ''
  })
}

/**
 * 删除规则
 * @param {*} index
 */
const deleteRule = (index) => {
  rules.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.rules_content {
  display: flex;
  flex-direction: column;
}
.w200 {
  width: 200px;
}
.w100 {
  width: 50px;
  text-align: right;
}
.vhCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mb10 {
  margin-bottom: 10px;
}

.item-box {
  display: flex;
  align-items: center;
}
.item-box + .item-box {
  padding-top: 10px;
  border-top: 1px solid #ddd;
}
.icon-box {
  margin-left: 10px;
  .icon {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
