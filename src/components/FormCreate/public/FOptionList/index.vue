<template>
  <div>
    <template v-if="type === 'el-select'">
      <el-option
        v-for="(item, index) in options"
        :label="item[label]"
        :value="item[value]"
        :key="index"
      >
      </el-option>
    </template>
    <template v-if="type === 'el-radio-group'">
      <el-radio
        v-for="(item, index) in options"
        :label="item[value]"
        :key="index"
      >
        {{ item[label] }}
      </el-radio>
    </template>
    <template v-if="type === 'el-checkbox-group'">
      <el-checkbox
        v-for="(item, index) in options"
        :label="item[value]"
        :key="index"
      >
        {{ item[label] }}
      </el-checkbox>
    </template>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type: string
    options: any
    label?: string
    value?: string
  }>(),
  {
    type: '',
    options: () => [],
    label: 'label',
    value: 'value',
  },
)
</script>

<style lang="scss" scoped></style>
