import { EventsData } from '../../Common/eventCommon/data'
import { styleSettingData } from '../../Common/styleSetting/data'
import NavigationBar from './NavigationBar/data'
export const pageHeightList = [
  {
    label: '不设置高度',
    value: '',
  },
  {
    label: '最小高度一屏',
    value: 'min-height:100vh;',
  },
  {
    label: '最大高度一屏',
    value: 'max-height:100vh;',
  },
  {
    label: '一屏',
    value: 'height:100vh;overflow: hidden;',
  },
]

/**
 * 初始化pageData
 * @returns
 */
export const initPageData = () => {
  return {
    id: null, // 前端输入编号
    title: null, //标题
    active: true, //是否启用
    backgroundColor: null, //背景颜色
    backgroundImg: null, //背景图片URL
    childPageIds: [], //子页面配置主键集合
    customizeImages: [], // 自定义图片
    desc: null, // 备注 ,
    from: null, // 起始时间
    homePage: false, //是否是首页
    moduleSettings: [], //页面组件配置
    to: null, // 截至时间
    type: null, //页面设置类型 会员中心 member_center; 互动礼遇 interactive; 种草社区 community; 积分商城 points_mall
    shareCopy: null, // 分享文案
    shareFlag: false, //是否分享
    shareImag: null, //分享图片
    shareSetting: {
      imageUrl: null, //分享图片
      path: null, //分享路径
      title: null, //分享标题
      shareParams: null, //分享链接后面携带的参数
    },
    customHeader: false, //是否为自定义顶部导航 ,
    events: [new EventsData({ triggerType: 'onLoad' })], //操作事件
    pageStyle: new styleSettingData({ box: false, flex: false }), //页面样式配置
    pageHeight: null, //页面高度
    priority: 0, //页面优先级越大约再上
    navigationBar: new NavigationBar(),
    params: [], //页面额外参数
  }
}
