import { animationDefault, animationComponentsList } from './animate'
import { transitionDefault, transitionComponentsList } from './transition'

//有参数的事件的集合
export default {
  animate: {
    value: animationDefault,
    componentsList: animationComponentsList,
  },
  transition: {
    value: transitionDefault,
    componentsList: transitionComponentsList,
  },
  pop_ups: {
    value: {
      maskClose: true,
    },
    componentsList: [
      {
        field: 'maskClose',
        type: 'el-switch',
        title: '点击遮罩层关闭弹窗',
      },
    ],
  },
  showLoading: {
    value: {
      title: '加载中',
      maskClose: false,
    },
    componentsList: [
      {
        field: 'title',
        type: 'el-input',
        title: '提示文字',
      },
      {
        field: 'maskClose',
        type: 'el-switch',
        title: '防止触摸穿透',
      },
    ],
  },
  hideLoading: {
    value: {
      noConflict: false,
    },
    componentsList: [
      {
        field: 'noConflict',
        type: 'el-switch',
        title: '只隐藏loading',
      },
    ],
  },
  openLocation: {
    value: {
      latitude: '',
      longitude: '',
      scale: 18,
      name: '',
      address: '',
    },
    componentsList: [
      {
        field: 'latitude',
        type: 'el-input',
        title: '纬度',
      },
      {
        field: 'longitude',
        type: 'el-input',
        title: '经度',
      },
      {
        field: 'scale',
        type: 'el-input-number',
        title: '缩放比例',
        props: {
          min: 5,
          max: 18,
        },
      },
      {
        field: 'name',
        type: 'el-input',
        title: '位置名',
      },
      {
        field: 'address',
        type: 'el-input',
        title: '地址的详细说明',
      },
    ],
  },
}
