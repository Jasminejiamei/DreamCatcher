// pages/dcIndextest/dcIndextest.js
const db = wx.cloud.database()
var INDEX = '' //获取用户点击了的标签对应的目标的index
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targets: [], //存放当前用户所有目标记录
    lookfortarget: [], //当用户点击了某个标签后存放此标签对应的目标记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先获取用户的openid
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      //从target数据库中获取属于当前这个用户的目标
      db.collection('target').where({
        _openid: res.result.openid
      }).get().then(res => {
        //当前这个用户还未添加过目标
        if (res.data.length == 0) {
          console.log("用户还未添加目标")
        } else {
          this.setData({
            targets: res.data,
          })
        }
      })
    })
  },

  //前端在渲染标签时需要自定义一个属性targetindex,对应标签的index
  //后台返回用户点击的标签对应的目标，存放到lookfortarget数组
  clickLabel: function (event) {
    INDEX = event.target.dataset.targetindex;
    this.setData({
      lookfortarget: this.data.targets[INDEX],
    })
  },

  //新的目标详情以及结束时间的参数待传，后台数据库定义的日期是字符串类型
  updateTarget: function (time, context){
    db.collection('target').doc(this.data.targets[INDEX]._id).update({
      // data 传入需要局部更新的数据：time,context
      data: {
        endtime: time,
        targetDetail: context
      }
    }).then(res=>{
      console.log(res);
      this.onLoad();
    }).catch(err=>{
      console.log(err);
    })
  },

  deleteTarget: function () {
    db.collection('target').doc(this.data.targets[INDEX]._id).remove()
    .then(res=>{
      console.log(res);
      this.onLoad();
    }).catch(err=>{
      console.log(err);
    })
  },

  //点击了保存修改,需要获取用户输入的新的结束时间以及目标详情，然后再调用updateTarget函数，传入更改之后的结束时间以及目标详情
  clickSave: function () {
    var endtime = '';
    var targetDetail = '';
    /**
     * 省略了获取endtime和targetDetail的代码
     */
    this.updateTarget(endtime, targetDetail)
  },

  //点击了删除目标
  clickDelete: function () {
    this.deleteTarget();
  },

  addTarget: function(){
    db.collection('target').add({
      data: {
        endtime: "2019-12-02T17:30:00.882Z",
        targetDetail: "我要瘦10斤",
        targetLabel:"健康",
        isUpload:1,
        isAnonymous:0
      }
    }).then(res => {
      console.log(res);
      this.onLoad();
    }).catch(err => {
      console.log(err);
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