<template>
  <el-dropdown :hide-on-click="false" trigger="click" @visible-change="click">
    <el-button size="small" type="primary" icon="Setting" circle />
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="表格显示" name="1"
            ><CheckboxGroup
              v-model="columnCheckedList"
              :formList="columnFormList"
            ></CheckboxGroup>
          </el-collapse-item>
          <el-collapse-item title="搜索显示" name="2"
            ><CheckboxGroup
              v-model="searchCheckedList"
              :formList="searchFormList"
            ></CheckboxGroup>
          </el-collapse-item>
        </el-collapse>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, computed } from 'vue'
import CheckboxGroup from './checkboxGroup/index.vue'
const props = defineProps([
  'columnFormList',
  'columnCheckedList',
  'searchFormList',
  'searchCheckedList',
])

const emit = defineEmits([
  'update:columnCheckedList',
  'update:searchCheckedList',
])

const columnCheckedList = computed({
  get() {
    return props.columnCheckedList
  },
  set(val) {
    emit('update:columnCheckedList', val)
  },
})

const searchCheckedList = computed({
  get() {
    //console.log('searchCheckedList', props.searchCheckedList)
    return props.searchCheckedList
  },
  set(val) {
    emit('update:searchCheckedList', val)
  },
})

const activeName = ref('1')

const click = () => {
  activeName.value = '1'
}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
  cursor: pointer;
}

.dropdown-menu {
  padding: 10px 20px;
}
</style>
