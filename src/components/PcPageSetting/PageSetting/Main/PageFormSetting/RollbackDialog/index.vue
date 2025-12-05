<template>
  <el-dialog v-model="visible" title="选择历史版本" width="600px">
    <el-table :data="sortedList" height="320" style="width: 100%">
      <el-table-column label="#" width="60">
        <template #default="scope">
          <el-radio v-model="selectedIndex" :label="scope.$index"
            >选择</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="200">
        <template #default="scope">
          {{ formatTime(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template #default="scope">
          {{ scope.row.data?.[0]?.title || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="组件数" width="120">
        <template #default="scope">
          {{ (scope.row.data?.[0]?.moduleSettings || []).length }}
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="confirm">应用</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const visible = ref(false)
const list = ref([])
const selectedIndex = ref(0)

const show = (historyList) => {
  list.value = Array.isArray(historyList) ? historyList.slice() : []
  selectedIndex.value = 0
  visible.value = true
}

const sortedList = computed(() => {
  return (list.value || []).slice().sort((a, b) => {
    const ta = new Date(a?.time || 0).getTime()
    const tb = new Date(b?.time || 0).getTime()
    return tb - ta
  })
})

const formatTime = (t) => {
  try {
    const d = new Date(t)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const s = String(d.getDate()).padStart(2, '0')
    const h = String(d.getHours()).padStart(2, '0')
    const mi = String(d.getMinutes()).padStart(2, '0')
    const se = String(d.getSeconds()).padStart(2, '0')
    return `${y}-${m}-${s} ${h}:${mi}:${se}`
  } catch (e) {
    return '-'
  }
}

const emit = defineEmits(['confirm'])
const confirm = () => {
  const item = sortedList.value[selectedIndex.value]
  if (!item) return
  emit('confirm', item)
  visible.value = false
}

defineExpose({ show })
</script>

<style scoped></style>
