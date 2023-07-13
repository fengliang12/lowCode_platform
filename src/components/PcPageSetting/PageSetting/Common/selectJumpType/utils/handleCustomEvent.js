import { customEventList } from '../data'

/**
 * 自定义
 * @param {*} element
 * @returns
 */
const customEventComponentList = (element) => [
  {
    field: 'operationUrl',
    type: 'el-cascader',
    options: customEventList,
    props: {
      'show-all-levels': false,
      clearable: true,
      filterable: true,
      placeholder: '请选择',
      props: {
        emitPath: false,
      },
    },
    control: [
      {
        handle(val) {
          return ['tips', 'makePhoneCall'].includes(val)
        },
        formList: [
          {
            type: 'el-input',
            field: 'content',
            props: {
              placeholder: '请输入',
            },
          },
        ],
      },
    ],
  },
]

export { customEventComponentList }
