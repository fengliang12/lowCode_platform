
export default class {
    constructor() {
        this.interval = 1000; //间隔时间
        this.timeLimit = "days"; //时间类型 days,hours,minutes,seconds,milliseconds
    }
}


export const formListFn = function () {
    return [
        {
            type: 'el-input-number',
            field: 'interval',
            title: '间隔时间'
        },
        {
            type: 'el-select',
            field: 'timeLimit',
            title: '时间类型',
            options: [
                {
                    label: "日",
                    value: "days",
                },
                {
                    label: "小时",
                    value: "hours",
                },
                {
                    label: "分钟",
                    value: "minutes",
                },
                {
                    label: "秒",
                    value: "seconds",
                },
                {
                    label: "毫秒",
                    value: "milliseconds",
                },
            ]
        }
    ]
}