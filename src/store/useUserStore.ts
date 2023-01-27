import { defineStore } from 'pinia'
interface userStoreType {
  name: string
}
const useUserStore = defineStore<string, userStoreType>('userStore', {
  state: () => {
    return {
      name: '1111',
    }
  },
  actions: {},
})

export default useUserStore
