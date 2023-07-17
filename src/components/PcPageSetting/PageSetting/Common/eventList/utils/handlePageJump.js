import { usePageSetupStore } from '@/store/pageSetupStore'
const pageSetupStore = usePageSetupStore()
/**
 * 自定义
 * @param {*} element
 * @returns
 */
const pageJumpComponentList = (element) => {
  let list = []
  if (element.operationType === 'page_jump') {
    list = [
      {
        field: 'operationUrl',
        type: 'pagepath-cascader',
        on: { changeInfo: (e) => pagePathCascaderChange(e, element) },
      },
    ]
  } else if (element.operationType === 'page_setting') {
    list = [
      {
        field: 'operationUrl',
        type: 'el-select',
        props: {
          label: 'title',
          value: 'id',
        },
        options: pageSetupStore.pageList,
      },
    ]
  } else if (element.operationType === 'jump_relevance_mini') {
    list = [
      {
        field: 'operationUrl',
        type: 'el-input',
        props: {
          placeholder: '请输入路径',
        },
      },
      {
        field: 'jump_relevance_mini',
        type: 'el-input',
        props: {
          placeholder: '小程序appId',
        },
      },
    ]
  } else if (element.operationType === 'jump_h5') {
    list = [
      {
        field: 'operationUrl',
        type: 'el-input',
        props: {
          placeholder: '请输入路径',
        },
      },
    ]
  }
  list.push({
    field: 'moduleOperation',
    type: 'el-select',
    props: {
      placeholder: '请选择',
    },
    options: [
      {
        value: 'navigateTo',
        label: 'navigateTo(保留当前页面)',
      },
      {
        value: 'redirectTo',
        label: 'redirectTo(关闭当前页面)',
      },
      {
        value: 'reLaunch',
        label: 'reLaunch(关闭所有页面)',
      },
    ],
  })
  return list
}

/**
 * 小程序路径选择后
 */
const pagePathCascaderChange = (event, element) => {
  element.params = event?.params?.length > 0 ? event.params : []
}

export { pageJumpComponentList }
