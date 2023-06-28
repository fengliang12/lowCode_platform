import PageBoxSetting from '../pageBoxSetting/data.js'
export class ImageSettingData {
  constructor({ url = '', position = 'top', width = 750, height = 750 } = {}) {
    this.borderDistance = new PageBoxSetting({ width, height }) // 边框距离 ,
    this.firstFrameVideo = '' //视屏第一帧 ,
    this.hotModuleSettings = [] // 热区组件设置 ,
    this.imgType = 'common' // 图片类型 普通图片 common; 热区图片 hot;
    this.imgUrl = url // 图片信息 ,
    this.multimediaType = 'img' //多媒体类型  "img 图片; video 视频; audio 音频"
    this.position = position // 组件位置 top/bottom
    this.ratio = 1 //图片 宽/高比
    this.playConfig = null //播放配置
    this.imageConfig = null //图片配置
    this.videoConfig = null //视频配置
  }
}

export const imageConfigData = {
  mode: '',
  lazyLoad: '',
  showMenuByLongpress: '',
}

export const playConfigData = {
  autoplay: false,
  currentTime: 0,
  loop: false,
  pauseIcon: '',
  playIcon: '',
  playbackRate: 1,
  slider: {
    activeColor: 'rgba(110,108,108,1)',
    backgroundColor: 'rgba(224,224,224,1)',
  },
}

/**
 * 图片表单配置
 */
export const imageConfigFormList = [
  {
    field: 'mode',
    type: 'el-select',
    title: '图片裁剪、缩放的模式',
    options: [
      {
        label: '只保证图片的短边能完全显示出来(aspectFill)',
        value: 'aspectFill',
      },
      {
        label: '宽度不变，高度自动变化(widthFix)',
        value: 'widthFix',
      },
      {
        label: '高度不变，宽度自动变化(heightFix)',
        value: 'heightFix',
      },
      {
        label: '使图片的长边能完全显示出来(aspectFit)',
        value: 'aspectFit',
      },
    ],
  },
  {
    field: 'lazyLoad',
    type: 'el-select',
    title: '懒加载',
    defaultValue: false,
    options: [
      {
        label: '关闭',
        value: false,
      },
      {
        label: '开启',
        value: true,
      },
    ],
  },
  {
    field: 'showMenuByLongpress',
    type: 'el-select',
    title: '开启长按识别',
    defaultValue: false,
    options: [
      {
        label: '关闭',
        value: false,
      },
      {
        label: '开启',
        value: true,
      },
    ],
  },
]


/**
 * 图片表单配置
 */
export const videoConfigFormList = [
  {
    field: 'mode',
    type: 'el-select',
    title: '图片裁剪、缩放的模式',
    options: [
      {
        label: '只保证图片的短边能完全显示出来(aspectFill)',
        value: 'aspectFill',
      },
      {
        label: '宽度不变，高度自动变化(widthFix)',
        value: 'widthFix',
      },
      {
        label: '高度不变，宽度自动变化(heightFix)',
        value: 'heightFix',
      },
      {
        label: '使图片的长边能完全显示出来(aspectFit)',
        value: 'aspectFit',
      },
    ],
  },
  {
    field: 'lazyLoad',
    type: 'el-select',
    title: '懒加载',
    defaultValue: false,
    options: [
      {
        label: '关闭',
        value: false,
      },
      {
        label: '开启',
        value: true,
      },
    ],
  },
  {
    field: 'showMenuByLongpress',
    type: 'el-select',
    title: '开启长按识别',
    defaultValue: false,
    options: [
      {
        label: '关闭',
        value: false,
      },
      {
        label: '开启',
        value: true,
      },
    ],
  },
]
