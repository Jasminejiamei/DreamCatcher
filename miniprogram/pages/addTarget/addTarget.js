// miniprogram/pages/addTarget/addTarget.js
// 导入util
// var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
   modalHidden:true,
   check:false,
   type:"default",
    buttons: [
      { id: 1, name: '学习',src:'edit' },
      { id: 2, name: '旅游',src:'logistics'}, 
     { id: 3, name: '技能',src:'award-o'},
      { id: 4, name: '其他',src:'good-job-o'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var time =util.formatTime(new Date());
    wx.setNavigationBarTitle({
      title: '添加目标',
    }),
    // 默认第一个按钮被选中
   this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
      nowTime:new Date()
    })
  },
  
  // 时间
  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  // 获取输入文本
  targetContent:function(e){
    this.setData({
      content: e.detail.value
    });
  },

// 设置选中标签
  radioButtonTap: function (e) {
    // 选中的id
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
      }
      else {
        //其他的位置为false
        this.data.buttons[i].checked = false;
      }
    }
    this.setData({
      buttons: this.data.buttons,
      msg: "id:" + id
    })
  },
  // 复选框
  onChange(event){
    this.setData({
      checked:event.detail,
      check:!this.data.check
    });
    // 如果选中了则弹出询问是否需要匿名框
    if(this.data.check==false){
      console.log("没有选中发布");
    }else{
      console.log("当按下保存键才进行检查");
    }
  },
  // 保存点击事件需要检查输入的内容
  save:function(){
    if(this.data.date==null||this.data.content==null){
      console.log("信息还不完整哟！检查一下时间和内容吖");
       
    }else{
    // 怎么获取data中的check值？
    if(this.data.check==true){
      console.log("点击了上传");
     this.setData({
       modalHidden:!this.data.modalHidden
     });
    }
    console.log(this.data.content);
    if(this.data.modalHidden==true){
      console.log("保存成共");
   wx.showToast({
     title: '保存成功',
     icon:'success',
     duration:1500,
     mask:true
   })
    }
    }
  },
  // 确认匿名,需要给后台传匿名
  modalBindconfirm(){
    this.setData({
      modalHidden:!this.data.modalHidden
    });
    // wx.showToast({
    //   title: '匿名成功',
    //   icon:'success',
    //   duration:2500,
    //   mask:true,
    // });
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  },
  // 不要匿名
  modalBindcancel(){
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500,
      mask: true
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