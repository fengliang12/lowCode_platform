<template>
  <el-dialog
    title="异步配置"
    v-model="dialogVisible"
    append-to-body
    width="50%"
  >
    <FormCreate
      ref="formCreateRef"
      v-model="itemValue.syncEvent"
      :formList="formList"
    ></FormCreate>
    <template v-slot:footer>
      <div>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="confirm" type="primary"> 确 定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { set } from 'lodash'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { formListFn } from './data'
const itemValue = ref<any>({})
const dialogVisible = ref(false)
const emit = defineEmits(['confirm'])
const pageSetupStore = usePageSetupStore()
const oldName = ref()
const formList: FormCreate.FormItemListType = formListFn(
  pageSetupStore,
  oldName,
)

const show = (item: any) => {
  if (!item?.syncEvent) {
    set(item, 'syncEvent', {})
  } else {
    oldName.value = item?.syncEvent?.name
  }
  itemValue.value = item
  dialogVisible.value = true
}

const formCreateRef = ref<InstanceType<typeof FormCreate> | null>(null)
const confirm = () => {
  //console.log(formCreateRef.value)

  formCreateRef?.value &&
    formCreateRef?.value?.validate()?.then((valid) => {
      //console.log(valid)

      if (valid) {
        pageSetupStore.addTimerName(itemValue.value?.syncEvent?.name)
        emit('confirm', itemValue.value)
        dialogVisible.value = false
      } else {
        return false
      }
    })
}

defineExpose({ show })
</script>
<style lang="scss" scoped></style>
