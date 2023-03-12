
export default class {
    constructor() {
        this.key = ""; //映射标记
        this.transform = false; //是否进行动画
        this.duration = 300; //动画时长，单位毫秒
        this.easingFunction = "ease-out"; //css缓动函数
    }
}

export const formListFn = function () {
    return [
        {
            type: 'el-input',
            field: 'key',
            title: '映射标记'
        },
        {
            type: "el-switch",
            field: 'transform',
            title: '是否进行动画',
            defaultValue: false,
            control: [
                {
                    handle(val) {
                        return val
                    },
                    formList: [
                        {
                            type: 'el-input',
                            field: 'duration',
                            title: '映射标记'
                        },
                        {
                            type: 'el-select',
                            field: 'easingFunction',
                            title: 'css缓动函数',
                            options: [
                                {
                                    label: "减速",
                                    value: "ease-out",
                                },
                                {
                                    label: "加速",
                                    value: "ease-in",
                                },
                                {
                                    label: "先加速后减速",
                                    value: "ease-in-out",
                                },
                                {
                                    label: "匀速",
                                    value: "linear",
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}