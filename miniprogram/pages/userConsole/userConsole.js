// pages/userConsole/userConsole.js
Page({
  //要渲染的数据变量定义，在请求数据的时候去赋值
  data: {
    openid: ''
  },

  /**
   * 向后台请求数据，setData，详情看开发文档的api，通过这样的方式做到数据动态渲染
   */
  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })
  }
})