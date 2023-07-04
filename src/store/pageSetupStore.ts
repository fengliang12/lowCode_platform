import { defineStore } from 'pinia'
import getters from './getters'
import { LocationQueryValue, useRouter } from 'vue-router'
import bus from '@/utils/bus'
import PageModuleLimitData from '@/components/PcPageSetting/PageSetting/Common/pageModuleLimit/data'
import { isEmpty } from 'lodash'
import pageSetupTestData from './pageSetupTestData/index'
import { getOperationApi } from '@/api/pageSetup/index'

const router = useRouter()

export interface MenuState {
  id: string | LocationQueryValue[]
  items: {
    value: any
    parents: any
  } | null
  [e: string]: any
}

export const usePageSetupStore = defineStore('pageSetupStore', {
  state: (): MenuState => {
    return {
      id: '',
      changeInfo: false, //信息是否被修改
      pageList: [], //配置列表
      pageNewParams: [], //页面新增参数
      PageSetupApiList: [], //全部api接口管理

      tagList: [], // 等级状态
      crowdList: [], // 人群
      pageSettingConstant: {
        pageSettingType: [],
      }, //页面配置
      childPageIds: [], //子页面配置主键集合
      jumpPageSetting: false, //限制点击跳转自定义页面
      items: {
        value: null,
        parents: null,
      }, //正在配置的组件
      itemsMap: new Map(), //页面对应map
      showHotBox: true, //显示热区边框
      AloneApiList: [], // 单独页面api管理
      usePageLimit: false,
      pageLimit: null,
      pageLimitInclude: false,
      brandList: [], //品牌列表
      timerNameList: [],
    }
  },
  getters,
  actions: {
    /**
     * 设置页面id
     * @param {*} id
     */
    setPageId(id: string) {
      this.id = id
    },

    /**
     * 更新数据
     */
    updatePageData() {},

    /**
     * 获取总的api管理
     */
    async getPageSetupApi() {
      const res = await getOperationApi()
      this.PageSetupApiList = res.data.data
    },

    /**
     * 获取标签
     */
    async getTagList() {
      this.tagList = pageSetupTestData.getMemberTagAll
    },

    /**
     * 获取人群
     */
    async getCrowdList() {
      this.crowdList = []
    },

    /**
     * 获取页面类型
     */
    async getPageSettingConstant() {
      this.pageSettingConstant = {
        pageSettingType: [
          {
            value: '会员中心',
            key: 'member_center',
          },
        ],
      }
    },

    /**
     * 清除items
     */
    clearItems() {
      this.items = null
    },

    /**
     * 设置页面参数
     * @param {} data
     */
    setPageNewParams(data: any) {
      const set = new Set()
      this.pageNewParams =
        data.filter((item: any) => {
          if (set.has(item)) return false
          set.add(item)
          return true
        }) || []
    },

    /**
     * 管理api数组及参数
     */
    async changeAloneAPIList() {
      this.AloneApiList = pageSetupTestData.getOperationApi
    },

    /**
     * 获取配置页面列表
     */
    async getPageList() {
      this.pageList = pageSetupTestData.getAllPage
    },

    /**
     * 设置页面items
     */
    setItems(value: any) {
      this.items = value
    },

    /**!
     * 设置组件集合
     */
    setPageItemsMap({ itemsMap, items, opt = 'set' }: any) {
      if (isEmpty(this.itemsMap)) {
        this.itemsMap = new Map()
      }
      if (itemsMap) {
        this.itemsMap = itemsMap
      }
      if (items) {
        if (opt === 'delete') {
          this.itemsMap.delete(items.code)
        } else {
          this.itemsMap.set(items.code, items)
        }
      }
    },

    /**
     * 设置等级
     */
    setTagList(list: any) {
      this.tagList = list
    },

    /**
     * 设置页面能否跳转到自定义页面
     */
    setJumpPageSetting(bol: boolean) {
      this.jumpPageSetting = bol
    },

    /**
     *设置是否显示热区边框
     */
    setShowHotBox(bol: boolean) {
      this.showHotBox = bol
    },

    /**
     * 设置页面子页面
     */
    setChildPageIds(val: any) {
      this.childPageIds = val
    },

    /**
     * 数据如果发生变化先保存当前页面，然后跳转到对应的页面
     */
    toPage(id: string) {
      if (this.changeInfo) {
        bus.emit('savePageSetting')
        return
      }
      router.replace({ name: 'pageSetupEdit', query: { id, child: 'true' } })
    },

    /**
     * 设置页面限制
     * @param {*} limit
     */
    setPageLimit(limit: any = new PageModuleLimitData()) {
      this.pageLimit = limit
    },

    /**
     * 添加异步事件名称
     */
    addTimerName(name: string) {
      if (this.timerNameList.find((i: string) => i === name)) return false
      this.timerNameList.push(name)
      console.log(this.timerNameList)
    },
  },
  persist: {
    enabled: true,
  },
})
