export  const formListFn =function(store:any,oldName:any){

  return [
    {
      field: 'name',
      title: '事件名称(变量)',
      type: 'el-input',
      rules: [
        {
          validator: (r:any, v:string, cb:any) => {
            if (!v) {
              cb(new Error('事件名称不能为空'))
            } else if (!/([a-z])([a-z1-9])*(_([a-z1-9]+))*/.test(v)) {
              cb(new Error('请输入正确事件名称'))
            } else if (
              v != oldName?.value && store?.timerNameList?.find((i: string) => i === v)
            ) {
              cb(new Error('事件名称已存在'))
            } else {
              cb()
            }
          },
          trigger: 'blur',
        },
      ],
    },
    {
      field: 'timerType',
      title: '执行类型',
      type: 'el-select',
      options: [
        {
          label: '延迟(setTimeout)',
          value: 'setTimeout',
        },
        {
          label: '循环(setInterval)',
          value: 'setInterval',
        },
        {
          label: '微任务(Promise)',
          value: 'microtask',
        },
      ],
      control: [
        {
          handle(value: string) {
            return ['setTimeout', 'setInterval'].includes(value)
          },
          formList: [
            {
              field: 'delay',
              title: '时间',
              type: 'el-input',
              props: {
                placeholder: 'delay(ms)',
              },
            },
          ],
        },
      ],
    },
  ]
}
