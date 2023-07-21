<template>
  <el-form>
    <!-- 关联组件 -->
    <el-form-item label="关联组件">
      <el-select v-model="indicatorData.relationSwiper" clearable>
        <el-option
          v-for="item in carouselList"
          :key="item.code"
          :label="item.title"
          :value="item.code"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 点击切换轮播 -->
    <el-form-item label="点击切换轮播">
      <el-switch v-model="indicatorData.currentSwitch"></el-switch>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div class="flex alignItems">
          默认样式
          <el-tooltip
            class="box-item"
            effect="dark"
            content="默认样式代表未特别设置指示点样式"
            placement="right-start"
          >
            <el-icon><WarnTriangleFilled /></el-icon>
          </el-tooltip>
        </div>
      </template>
      <div
        v-for="(item, index) in indicatorData.indicatorStyle"
        :key="index"
        style="width: 100%"
        class="flex alignItems"
      >
        <div v-if="index === 0">指示点默认样式</div>
        <div v-else>第{{ index + 1 }}个指示点默认样式</div>
        <el-icon
          class="ml10 pointer"
          @click="deleteStyle('indicatorStyle', index)"
          ><DeleteFilled
        /></el-icon>
        <el-icon
          class="ml10 pointer"
          @click="editStyle(item, 'indicatorStyle', index)"
          ><EditPen
        /></el-icon>
        <el-icon
          v-if="index === indicatorData.indicatorStyle.length - 1"
          class="ml10 pointer"
          @click="addStyle('indicatorStyle', index)"
          ><CirclePlus
        /></el-icon>
      </div>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div class="flex alignItems">
          选中样式
          <el-tooltip
            class="box-item"
            effect="dark"
            content="默认选中样式代表未特别设置指示点样式"
            placement="right-start"
          >
            <el-icon><WarnTriangleFilled /></el-icon>
          </el-tooltip>
        </div>
      </template>
      <div
        v-for="(item, index) in indicatorData.indicatorActiveStyle"
        :key="index"
        style="width: 100%"
        class="flex alignItems"
      >
        <div v-if="index === 0">指示点选中样式</div>
        <div v-else>第{{ index + 1 }}个指示点选中样式</div>
        <el-icon
          class="ml10 pointer"
          @click="deleteStyle('indicatorActiveStyle', index)"
          ><DeleteFilled
        /></el-icon>
        <el-icon
          class="ml10 pointer"
          @click="editStyle(item, 'indicatorActiveStyle', index)"
          ><EditPen
        /></el-icon>
        <el-icon
          v-if="index === indicatorData.indicatorStyle.length - 1"
          class="ml10 pointer"
          @click="addStyle('indicatorActiveStyle', index)"
          ><CirclePlus
        /></el-icon>
      </div>
    </el-form-item>
  </el-form>

  <el-dialog title="样式" v-model="dialog.visible">
    <StyleSetting
      v-model="dialog.item"
      :font="false"
      :flex="false"
    ></StyleSetting>
    <template #footer>
      <div>
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { styleSettingData } from '../../../Common/styleSetting/data'
import StyleSetting from '../../../Common/styleSetting/index.vue'
import { typeOf } from '@/components/PcPageSetting/utils'
import { cloneDeep } from 'lodash'
const pageSetupStore = usePageSetupStore()
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const indicatorData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 轮播图list
 */
const carouselList = computed(() => {
  return typeOf(pageSetupStore.itemsMap) === 'map'
    ? Array.from(pageSetupStore.itemsMap.values()).filter(
        (elem) => elem.moduleType === 'carousel',
      )
    : []
})

/**
 * 删除样式
 */
const deleteStyle = (type, index) => {
  indicatorData.value[type].splice(index, 1)
}

/**
 * 编辑样式
 */
const dialog = ref({
  visible: false,
  item: null,
  type: '',
  index: 0,
})
const editStyle = (item, type, index) => {
  dialog.value = {
    visible: true,
    item: cloneDeep(item),
    type,
    index,
  }
}

/**
 * 确认
 */
const confirm = () => {
  let { item, type, index } = dialog.value
  indicatorData.value[type][index] = item
  dialog.value.visible = false
}

/**
 * 添加样式
 */
const addStyle = (type) => {
  indicatorData.value[type].push(
    new styleSettingData({
      width: 40,
      height: 40,
      position: 'relative',
      left: 0,
      top: 0,
      front: false,
      flex: false,
    }),
  )
}

/**
 * 监听
 */
watch(
  () => props.modelValue,
  (val) => {
    if (val.indicatorStyle.length === 0) {
      addStyle('indicatorStyle')
    }
    if (val.indicatorActiveStyle.length === 0) {
      addStyle('indicatorActiveStyle')
    }
  },
  {
    immediate: true,
  },
)
</script>
<style lang="scss" scoped></style>
