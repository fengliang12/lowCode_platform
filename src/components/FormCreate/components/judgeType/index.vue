<template>
  <div>
    <el-divider v-if="formItem.divider">
      {{ formItem.divider == 'default' ? '' : formItem.divider }}
    </el-divider>
    <template v-if="formItem.type === 'object'">
      <ObjectItem
        :formData="formData"
        :formItem="formItem"
        :propKey="propKey"
      ></ObjectItem>
    </template>
    <template v-if="formItem.type === 'group'">
      <GroupItem
        :formData="formData"
        :formItem="formItem"
        :propKey="propKey"
      ></GroupItem>
    </template>
    <template v-else-if="formItem.type === 'collapse'">
      <CollapseItem
        :formData="formData[formItem.field]"
        :form-item="formItem"
        :prop-key="propKey"
      ></CollapseItem>
    </template>
    <template v-else>
      <FormItem
        :formData="formData"
        :formItem="formItem"
        :propKey="propKey"
        :groupIndex="groupIndex"
      ></FormItem>
    </template>
  </div>
</template>

<script setup lang="ts">
import FormItem from '../formItem/index.vue'
import ObjectItem from '../object/index.vue'
import GroupItem from '../group/index.vue'
import CollapseItem from '../collapseItem/index.vue'
defineProps<{
  formData: any
  formItem: FormCreate.FormItemType
  propKey: string
  groupIndex?: number
}>()
</script>

<style lang="scss" scoped></style>
