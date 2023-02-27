import { ref, defineEmits } from 'vue'
export const useValidate = () => {
  const form = ref(null)
  const emit = defineEmits(['update:activeName'])
  const next = async ({ check = false, activeName = 'counter' }) => {
    const valid = await form.value.validate().catch(() => false)
    if (!valid) {
      return check ? Promise.reject(false) : false
    }
    if (!check) {
      emit('update:activeName', activeName)
    }
  }
  return { next }
}
