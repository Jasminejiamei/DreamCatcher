// miniprogram/pages/dcindex1/dcindex1.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
   targetday:'___',
   show:0,
   date:'2019-11-14',
   focus:false,
   targetindex:0,
   target:1  //应该是dcindextest里的数组，但是我不会调
  },
  /**
   * 查看目标
   */
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：',e.detail.value),
    console.log(this.data.date)
  },
  
  /**
   * 点击第一个目标
   * 
   */
  target1: function (event) {
    this.setData({
      show: 1,
      targetindex:1
    })
  },
  target2: function (event) {
    this.setData({
      show: 1,
      targetindex:2
    })
  },
  target3: function (event) {
    this.setData({
      show: 1,
      targetindex: 3
    })
  },
  target4: function (event) {
    this.setData({
      show: 1,
      targetindex: 4
    })
  },
  target5: function (event) {
    this.setData({
      show: 1,
      targetindex: 5
    })
  },
   /**
   * 关闭第一个目标
   * 
   */
  closedream:function(event){
    this.setData({
      show:0
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
    })
  },
  bindTextAreaBlur:function(e){
    console.log(e.detail.value)
  },
  jisuan:function(event){
    var t=new Date();
    console.log(t);
    console.log(this.data.targetday)
    this.setData({ 
        targetday:this.data.targetday-t
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})