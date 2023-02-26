interface FormConfigProps {
  inline: boolean
  gutter: string
  span: string
}

type FormItemListType = Array<FormItemType>

interface EffectType {
  fetch: any
  param: any
  to: string
  parse: (e: any) => any
}

interface FormItemType {
  title: any
  field: string
  divider?: string
  field1?: string
  ref?: string
  type: string
  formList?: FormItemListType
  props?: any
  control?: any
  link?: string[]
  update?: (valueList: any, props: any) => any
  effect?: EffectType
  rules?: any[]
  options?: any
  tips?: string
  button?: any
  btnClick?: (valueList: any, props: any) => any
  on?: any
  hideOption?: string[]
  defaultValue?: any
}
