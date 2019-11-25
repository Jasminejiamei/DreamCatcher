// miniprogram/pages/dcindex1/dcindex1.js
const db = wx.cloud.database()
var INDEX = '' //获取用户点击了的标签对应的目标的index
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
   targets:[
     {endtime:'2019-11.27'}
   ]  //应该是dcindextest里的数组，但是我不会调
  },

  /**
   * 监听页面加载,获取当前用户目标
   */
  onLoad: function (options) {
    //先获取用户的openid
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      //从target数据库中获取属于当前这个用户的目标
      db.collection('target').where({
        // _openid: res.result.openid
        _openid:q80pGeSrpqOp06vk5I
      }).get().then(res => {
        //当前这个用户还未添加过目标
        if (res.data.length == 0) {
          wx.showToast({
            title: '当前没有目标噢！',
            icon: 'none',
            duration: 2000
          })
        } else {
          this.setData({
            targets: res.data,
          })
        }
      })
    })
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
    var year = t.getFullYear();
    var month = t.getMonth()+1;
    var date = t.getDate(); 
    var newtargetdays = year+'-'+month+'-'+date;
    console.log(newtargetdays);
    console.log(this.data.date);
    var newdays = newtargetdays - this.data.date;
    console.log(newdays);
    this.setData({ 
        targetday:this.data.targetday-t
    })
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