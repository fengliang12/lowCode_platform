import PageModuleLimitData from './Common/pageModuleLimit/data'
import { styleSettingData } from './Common/styleSetting/data'
import { ImageSettingData } from './Common/fissionImage/data'
import { pageValueData } from './Common/setData/data'
import { generateId } from './Handle/util'
import componentsMapping from './CommonData/componentsMapping'
import SwiperSettingData from './Main/ModuleSetting/SwiperSetting/data'
import ProgressData from './Main/ModuleSetting/Progress/data'
import ScrollViewData from './Main/ModuleSetting/ScrollView/data'
import IndicatorData from './Main/ModuleSetting/Indicator/data'
import MovableAreaData from './Main/ModuleSetting/MovableArea/data'
import MovableViewData from './Main/ModuleSetting/MovableView/data'
import RichTextData from './Main/ModuleSetting/RichText/data'

/**
 * 组件类型
 */
export class moduleData {
  constructor({
    code = '',
    title = '',
    moduleType = 'common',
    width = 750,
    height = 200,
  } = {}) {
    this.code = code //编号
    this.title = title //标题
    this.initModuleViewHide = null //初始化模块隐藏
    this.params = null //组件参数

    // 限制条件
    this.from = '' //起始时间
    this.to = '' //截至时间
    this.moduleLimit = new PageModuleLimitData() //页面组件限制
    this.conditionsForExecution = null //其他条件判断

    //页面样式配置
    this.pageStyle = new styleSettingData({ width, height })
    this.executionAndStyles = null //条件样式

    //子组件
    this.moduleType = moduleType //"通用组件 common; 轮播组件 carousel; 热区组件 hot; 表单组件 form; 浮窗组件 float;  //进度条组件progress  //滚动条组件 scrollView //指示点组件 indicator
    this.moduleSettings = []
    this.imageSetting =
      moduleType === 'hot' ? new ImageSettingData({ width, height }) : null //图片配置
    this.carousel = moduleType === 'carousel' ? new SwiperSettingData() : null //轮播配置
    this.progress = moduleType === 'progress' ? new ProgressData() : null //进度条
    this.executionAndProgresses = null //条件进度条样式
    this.scrollView = moduleType === 'scrollView' ? new ScrollViewData() : null //滚动条
    this.indicator = moduleType === 'indicator' ? new IndicatorData() : null //指示点
    this.buttonType = moduleType === 'weChatButton' ? 'getPhoneNumber' : null //按钮类型
    this.movableArea =
      moduleType === 'movableArea' ? new MovableAreaData() : null // 拖拽区域
    this.movableView =
      moduleType === 'movableView' ? new MovableViewData() : null //拖拽容器
    this.richText = moduleType === 'richText' ? new RichTextData() : null //富文本

    //页面值
    this.pageValue = ['text', 'common', 'slot'].includes(moduleType)
      ? new pageValueData({
          valueType: moduleType === 'common' ? 'pageData' : 'custom',
        })
      : null

    //事件数据
    this.events = null
    this.hotOperations = [] //事件
  }
}

/**
 * 初始化module
 * @param {*} param0
 * @returns
 */
export const setModule = ({ moduleType, width = 750, height = 200 } = {}) => {
  const code = generateId(moduleType)
  const data = new moduleData({
    moduleType,
    code,
    width,
    height,
    title: `${componentsMapping[moduleType].name}_${code}`,
  })
  return data
}
