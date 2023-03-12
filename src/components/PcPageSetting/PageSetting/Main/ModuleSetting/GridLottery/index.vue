<template>
  <div>
    <FormCreate v-model="GridLotteryData" :formList="formList">
      <div class="flex">
        <template v-for="(elem, index) in imgCount" :key="index">
          <upload-file
            v-model:url="GridLotteryData.images[index]"
          ></upload-file>
        </template>
      </div>
    </FormCreate>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formListFn } from './data'
import FormCreate from '@/components/FormCreate/index.vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const GridLotteryData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const imgCount = ref(9)

const formList = ref(formListFn(imgCount))
</script>

<style lang="scss" scoped>
.flex {
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>
