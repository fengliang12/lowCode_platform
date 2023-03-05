<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="基础配置" name="first">
      <BasicConfig
        :ref="(el) => setItemRef(el, 'first')"
        v-model:active-name="activeName"
        v-model="pageFormData"
      ></BasicConfig>
    </el-tab-pane>
    <el-tab-pane label="样式设置">
      <StyleSetting v-model="pageFormData.pageStyle" :flex="false" :box="false">
        <el-col>
          <el-form-item label="页面高度">
            <el-select v-model="pageFormData.pageHeight" placeholder="请选择">
              <el-option
                v-for="item in pageHeightList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col
          ><el-form-item label="是否为自定义顶部导航">
            <el-switch
              v-model="pageFormData.customHeader"
              active-text="是"
              inactive-text="否"
            /> </el-form-item
        ></el-col>
        <NavigationBar
          v-if="pageFormData.customHeader"
          v-model="pageFormData.navigationBar"
        />
      </StyleSetting>
    </el-tab-pane>
    <el-tab-pane label="事件" name="third">
      <EventCommon isPage v-model="pageFormData.events"></EventCommon>
    </el-tab-pane>
    <el-tab-pane label="相关配置页" name="fourth">
      <PageList ref="second" :value="pageFormData"></PageList>
    </el-tab-pane>
    <el-tab-pane label="API管理" name="fifth"
      ><PageSetupApi></PageSetupApi
    ></el-tab-pane>
    <el-tab-pane label="页面等级限制" name="sixth">
      <PageLimit></PageLimit>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePageSetupStore } from '@/store'
import { initPageData, pageHeightList } from './data'
import BasicConfig from './BasicConfig/index.vue'
import StyleSetting from '../../Common/styleSetting/index.vue'
import EventCommon from '../../Common/eventCommon/index.vue'
import { isObject } from 'lodash'
import NavigationBar from './NavigationBar/index.vue'
import PageList from './PageList/index.vue'
import PageLimit from './PageLimit/index.vue'
import PageSetupApi from './PageSetupApi/index.vue'

const props = defineProps(['detail'])
const pageSetupStore = usePageSetupStore()
const pageFormData = ref(initPageData())

/**
 * 初始化页面数据
 */
const handlePageData = (data, initData) => {
  if (isObject(data)) {
    Object.keys(initData).forEach((key) => {
      if (data[key] === null || data[key] === undefined) {
        data[key] = initData[key]
      } else {
        data[key] = handlePageData(data[key], initData[key])
      }
    })
  }
  return data
}

watch(
  () => props.detail,
  (val) => {
    pageFormData.value = handlePageData(cloneDeep(val), initPageData())
    pageSetupStore.setPageNewParams(val.params)
  },
)

watch(
  () => pageFormData.value.title,
  (val) => {
    if (pageFormData.value.customHeader) return
    pageFormData.value.navigationBar.title = val
  },
)

/**
 * 保存
 */
const save = async () => {
  const check = await beforeLeave('end').catch((err) => {
    console.log('err', err)
  })

  if (!check) return false
  pageFormData.value.params = pageSetupStore.pageNewParams
  return pageFormData.value
}

/**
 * 数据保存需要进行表单校验
 */
const activeName = ref('first')
const refObject = {}
const setItemRef = (el, key) => {
  if (el) {
    refObject[key] = el
  }
}

/**
 * 每个tab栏离开前
 */
const beforeLeave = async (activeName) => {
  const arr = ['first', 'end']
  const index = arr.indexOf(activeName)
  const checkArr = arr.slice(0, index)

  let promiseList = checkArr.map((item, index) => {
    // 多个ref操作dom元素
    return refObject[item]
      .next({
        check: true,
        activeName: checkArr[index + 1],
      })
      .catch((err) => {
        activeName.value = item
        return Promise.reject(err)
      })
  })
  return Promise.all(promiseList)
}

// 对外暴露方法
defineExpose({ save })
</script>

<style lang="scss" scoped>
:deep(.el-tabs__content) {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  overflow-y: scroll;
  height: calc(100vh - 200px);
}
:deep(.el-tabs__content::-webkit-scrollbar) {
  display: none !important;
}
</style>
