Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customLoading: {
      type: Boolean,
      value: false
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 防止点击穿透 */
    stop () {},
  }

})
