<template>
  <div class="tab-form">
    <el-tabs v-model="activeName" v-bind="props" :before-leave="beforeLeave">
      <el-tab-pane
        v-for="(item, index) in tabsConfig"
        :key="index"
        v-bind="item.props"
      >
        <FormCreate
          :ref="`formCreate${String(index)}`"
          v-model="valueData"
          :form-list="item.formList"
          :options="optionsValue"
        ></FormCreate>
      </el-tab-pane>

      <el-button v-if="tabsConfig.length - 1 != activeName" @click="next()"
        >下一步</el-button
      >
      <el-button v-if="showSubmitBtn" @click="sub">
        {{ options.submitText || '提交' }}
      </el-button>
    </el-tabs>
  </div>
</template>
<script>
import FormCreate from '../index.vue'
import { getFormObject, setMerge } from '../utils/index.js'
export default {
  components: {
    FormCreate,
  },
  props: {
    values: {
      type: [Object, Array],
      default: () => ({}),
    },
    tabsConfig: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({ type: 'border-card', 'tab-position': 'left' }),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeName: '0',
      init: false,
    }
  },
  computed: {
    unDisabledIndex() {
      const indexList = []
      this.tabsConfig.forEach((element, index) => {
        if (!element?.props?.disabled) {
          indexList.push(index.toString())
        }
      })
      return indexList
    },
    tabsConfigFormList() {
      return this.tabsConfig.map((elem) => elem.formList).flat(1)
    },
    // 展示提交按钮
    showSubmitBtn() {
      return this.options?.onSubmit
    },
    optionsValue() {
      const { options } = this
      return {
        ...options,
        onSubmit: null,
        onCancel: null,
        getData: null,
        initDate: false,
      }
    },
    valueData: {
      get() {
        return this.values
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    value(value) {
      if (!Object.keys(value).length) {
        this.handleData()
      }
    },
  },
  methods: {
    /**
     * 处理数据
     * @param {*} val
     */
    handleData(val = this.value) {
      this.valueData = setMerge(
        val ?? {},
        getFormObject(this.tabsConfigFormList),
      )
      this.init = true
    },

    /**
     * 查询数据
     */
    async getData() {
      if (this?.options?.getData) {
        const val = await this.options.getData(this.value)
        this.handleData(val)
      } else {
        this.handleData()
      }
    },

    /**
     * 下一步
     */
    next() {
      const { unDisabledIndex, activeName } = this
      const index = unDisabledIndex.indexOf(activeName)
      this.activeName = unDisabledIndex[index + 1]
    },

    /**
     * 提交数据
     */
    async sub() {
      this.beforeLeave('endSub').then(() => {
        this.options.onSubmit(this.dataValue)
      })
    },

    /**
     * 校验表单
     */
    validate() {
      return this.beforeLeave('endSub')
    },

    /**
     * 表单校验
     * @param {*} activeName
     */
    beforeLeave(activeName) {
      const arr = Object.keys(this.tabsConfig)
      const index = arr.indexOf(activeName)
      if (index === 0) return true
      const checkArr = activeName === 'endSub' ? arr : arr.slice(0, index)
      return Promise.all(
        checkArr.map((elem, index) => {
          if (!this.$refs[`formCreate${elem}`]) {
            return Promise.resolve(true)
          }
          return this.$refs[`formCreate${elem}`][0]
            .validate({
              check: true,
              activeName: checkArr[index + 1],
            })
            .catch(() => {
              this.activeName = elem
              return Promise.reject()
            })
        }),
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.tab-form {
  display: flex;
  flex: 1;
}
</style>
