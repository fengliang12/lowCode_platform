export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: any
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: any
  }
}
