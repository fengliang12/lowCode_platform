import { animationDefault, animationComponentsList } from './animate'
import { transitionDefault, transitionComponentsList } from './transition'

export default {
  animate: {
    value: animationDefault,
    componentsList: animationComponentsList,
  },
  pop_ups: {
    value: {
      maskClose: true,
    },
    componentsList: [
      {
        key: 'maskClose',
        component: 'el-switch',
        label: '点击遮罩层关闭弹窗',
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
        key: 'title',
        component: 'el-input',
        label: '提示文字',
      },
      {
        key: 'maskClose',
        component: 'el-switch',
        label: '防止触摸穿透',
      },
    ],
  },
  hideLoading: {
    value: {
      noConflict: false,
    },
    componentsList: [
      {
        key: 'noConflict',
        component: 'el-switch',
        label: '只隐藏loading',
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
        key: 'latitude',
        component: 'el-input',
        label: '纬度',
      },
      {
        key: 'longitude',
        component: 'el-input',
        label: '经度',
      },
      {
        key: 'scale',
        component: 'el-input-number',
        label: '缩放比例',
        props: {
          min: 5,
          max: 18,
        },
      },
      {
        key: 'name',
        component: 'el-input',
        label: '位置名',
      },
      {
        key: 'address',
        component: 'el-input',
        label: '地址的详细说明',
      },
    ],
  },
  transition: {
    value: transitionDefault,
    componentsList: transitionComponentsList,
  },
}
