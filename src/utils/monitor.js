import { useErrorStore } from '@/store'

const errorHandler = (err, vm, info) => {
  const url = window.location.href
  const errorStore = useErrorStore()
  errorStore.addErrorLogs({ url, err, vm, info })
}
export default errorHandler
