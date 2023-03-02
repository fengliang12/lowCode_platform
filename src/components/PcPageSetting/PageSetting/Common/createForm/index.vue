<template>
  <el-form>
    <el-row>
      <slot></slot>
      <el-col v-for="(item, idx) in formComponentsList" :key="item.key">
        <el-divider v-if="item.divider">{{ item.divider }}</el-divider>
        <el-form-item :label="item.label">
          <div class="flex">
            <component
              :is="item.component"
              v-model="modelValue[item.key]"
              v-model:url="modelValue[item.key]"
              :value="modelValue[item.key] || item.defaultValue"
              :id="item.key + idx"
              v-bind="{ clearable: true, filterable: true, ...item.props }"
              v-on="item?.on || {}"
            >
              <template v-if="item.child">
                <div v-for="(child, cIndex) in item.child" :key="cIndex">
                  <template v-if="child.component === 'el-option'">
                    <el-option
                      v-for="(option, oIndex) in child.optionList"
                      :key="oIndex"
                      :label="option.label"
                      :value="option.value"
                    />
                  </template>
                  <component v-else :is="child.component"></component>
                </div>
              </template>
            </component>
            <!-- 提示 -->
            <template v-if="item.tips">
              <el-tooltip :content="item.tips" placement="top-start">
                <el-icon><Warning /></el-icon>
              </el-tooltip>
            </template>
            <!-- 按钮 -->
            <template v-if="item.button">
              <el-button @click="item.btnClick(modelValue)">
                {{ item.button }}
              </el-button>
            </template>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  formComponentsList: {
    type: Array,
    default: () => [],
  },
})
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
</style>
