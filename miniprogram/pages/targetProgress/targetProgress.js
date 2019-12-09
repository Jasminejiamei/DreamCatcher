// miniprogram/pages/targetProgress/targetProgress.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    targetProgress: [],  //这是关注的目标
    userInfo: []     //这是用户的信息
   

  },

  
 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('userInformation').get().then(res => {
      var that = this
      that.setData({
        userInfo: res.data
      })
    })
    db.collection('likeIt').get().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        var obj = {};
        obj._openid = res.data[i]._openid;
        obj.endtime = res.data[i].endtime;
        obj.isAnonymous = res.data[i].isAnonymous;
        obj.isUpload = res.data[i].isUpload;
        obj.targetDetail = res.data[i].targetDetail;
        obj.targetLabel = res.data[i].targetLabel;
        obj.nickName = '';
        obj.avatarUrl = '';
        obj.color = "";
        if (obj.targetLabel == "学习") {
          obj.color = "#D4F9C8";
        };

        if (obj.targetLabel == "技能") {
          obj.color = "#FFCC66";
        };

        if (obj.targetLabel == "旅行") {
          obj.color = "#A4F4F4";
        };

        if (obj.targetLabel == "其他") {
          obj.color = "#FF9999";
        };

        let targetProgress = this.data.targetProgress;
        targetProgress.push(obj);
        this.setData({ targetProgress })

      }
      for (var i = 0; i < this.data.targetProgress.length; i++) {
        
        if (this.data.targetProgress[i].isAnonymous == false) {
          
          for (var j = 0; j < this.data.userInfo.length; j++) {
            if (this.data.userInfo[j]._openid == this.data.targetProgress[i]._openid) {
              var nickName = "targetProgress[" + i + "].nickName"
              var avatarUrl = "targetProgress[" + i + "].avatarUrl"
              this.setData({
                [nickName]: this.data.userInfo[j].nickName,
                [avatarUrl]: this.data.userInfo[j].avatarUrl
              })
              break
            }
          }
        }
      }
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
    wx.redirectTo({
      url: '../dcindex1/dcindex1'      //这里的跳转不是很流畅
    })
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