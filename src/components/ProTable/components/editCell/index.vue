<template>
  <div class="edit_cell">
    <div v-if="column.canEdit" class="can_edit" @click="beginEdit">
      <div v-show="!editStatus">
        {{ valueData }}
      </div>
      <div v-show="editStatus">
        <el-input
          type="text"
          :modelValue="modelValue"
          ref="inputRef"
          @blur="loseFocus"
          @keyup.enter="loseFocus"
        ></el-input>
      </div>
    </div>
    <div class="no_edit" v-else>
      {{ valueData }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps(['modelValue', 'row', 'column'])
// const emit = defineEmits(['update:modelValue'])

/**
 * 单击开始编辑
 */
const editStatus = ref(false)
const inputRef = ref(null)
const beginEdit = () => {
  editStatus.value = true
  inputRef.value.focus()
}

/**
 * @param {event} event
 * 丢失焦点关闭编辑状态，并保存数据
 */
const loseFocus = (e) => {
  let value = e.target.value
  if (value === props.modelValue) return
}
onMounted(() => {})
</script>
<style lang="scss" scoped></style>
