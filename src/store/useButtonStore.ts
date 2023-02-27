import { defineStore } from 'pinia'

export interface ButtonState {
  buttonList: string[]
}
export const useButtonStore = defineStore('buttonStore', {
  state: (): ButtonState => ({
    buttonList: [],
  }),
  getters: {
    getButtons: (state) => state.buttonList,
  },
  actions: {
    generateButtons(buttons: string[]) {
      if (!buttons) return
      const bList: string[] = []
      buttons.forEach((button) => {
        bList.push(button)
      })

      this.buttonList = bList
    },
  },
})
