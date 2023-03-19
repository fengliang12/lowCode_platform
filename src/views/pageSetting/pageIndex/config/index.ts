const ConfigFn: () => FormCreate.FormItemListType = () => {
  return [
    {
      type: 'el-input',
      field: 'id',
      title: '编码',
      props: {
        placeholder: '请输入编码',
      },
      defaultValue: '',
    },
    {
      type: 'el-input',
      field: 'title',
      title: '弹窗标题',
      rules: [{ required: true, message: '请输入弹窗标题' }],
      props: {
        disabled: false,
        placeholder: '请输入弹窗标题',
      },
      defaultValue: '',
    },
  ]
}

export default ConfigFn
