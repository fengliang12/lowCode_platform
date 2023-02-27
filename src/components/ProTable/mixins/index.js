export default {
  data() {
    return {}
  },
  computed: {},
  async created() {},

  methods: {
    //获取columns中的索引
    getColumnsIndex(prop) {
      const { columns } = this
      if (!columns.length) {
        console.error('未定义columns列表')
        return 0
      }
      return this.columns.findIndex((elem) => elem.prop === prop)
    },
  },
}
