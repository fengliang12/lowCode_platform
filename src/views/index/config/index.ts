import i18n from '@/i18n/index'
const ConfigFn: () => FormCreate.FormItemListType = () => {
  return [
    // 框架尺寸
    {
      type: 'el-select',
      field: 'frameSize',
      title: i18n.global.t('frameSize'),
      rules: [{ required: true, message: 'Please select frame size' }],
      props: {
        disabled: false,
        placeholder: 'Please select frame size',
      },
      options: [
        {
          value: '67',
          label: '400-2500A',
        },
        {
          value: '69',
          label: '4000-6300A',
        },
      ],
      defaultValue: '',
    },
    // 分断能力
    {
      type: 'el-select',
      field: 'switchingCapacity',
      title: 'switchingCapacity',
      rules: [
        {
          required: true,
          message: 'Please select Switching Capacity',
        },
      ],
      props: {
        disabled: false,
        placeholder: 'Please select Switching Capacity',
      },
      options: [
        {
          value: '50kA',
          label: '50kA',
        },
        {
          value: '66kA',
          label: '66kA',
        },
        {
          value: '75kA',
          label: '75kA',
        },
      ],
      defaultValue: '',
    },
    {
      type: 'object',
      field: 'limiting',
      formList: [
        {
          type: 'el-radio-group',
          field: 'range',
          title: '范围限制',
          options: [
            {
              label: '忽略',
              value: 'IGNORE',
            },
          ],
        },
        {
          type: 'el-input',
          field: 'times',
          title: '频率次数',
        },
      ],
    },
    {
      type: 'el-input',
      field: 'name',
      title: 'switchingCapacity',
      rules: [
        {
          required: true,
          message: 'Please select Switching Capacity',
        },
      ],
      props: {
        disabled: false,
        placeholder: 'Please select Switching Capacity',
      },
      defaultValue: '',
    },
    {
      type: 'group',
      field: 'limiting',
      formList: [
        {
          type: 'el-radio-group',
          field: 'range',
          title: '范围限制',
          options: [
            {
              label: '忽略',
              value: 'IGNORE',
            },
          ],
        },
        {
          type: 'el-input',
          field: 'times',
          title: '频率次数',
        },
      ],
    },
    {
      type: 'el-switch',
      field: 'expiredRemind',
      title: '开启卡券过期提醒',
      // 控制是否显示
      control: [
        {
          handle(val: any) {
            return val
          },
          formList: [
            {
              type: 'el-input',
              field: 'days',
              title: '卡券到期多少天内提醒',
              rules: [{ required: true, message: '到期多少天内提醒' }],
            },
          ],
        },
      ],
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
      link: ['frameSize'],
      //link 可以监听filed字段值的改变
      //link: ["customizeImages.{{groupIndex}}.content"], {{}}中间可以替换组件中任意变量如groupIndex 数组中的索引
      //不用箭头函数可以取到表单层this
      //return 返回false时该表单不显示
      //不存在link字段时val值为自身的值 存在为数组。rules为当前表单配置
      update(val, rules) {
        if (val) {
          rules.title = val.toString()
        }
      },
      defaultValue: '',
    },
    {
      type: 'collapse',
      field: 'limiting2',
      props: { accordion: true },
      formList: [
        {
          type: 'el-radio-group',
          field: 'range',
          title: '范围限制',
          options: [
            {
              label: '忽略',
              value: 'IGNORE',
            },
          ],
        },
        {
          type: 'el-input',
          field: 'times',
          title: '频率次数',
        },
      ],
    },
  ]
}

export default ConfigFn
