// miniprogram/pages/targetProgress/targetProgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    
    //进度列表
    Progresslist: [{ avatar: "/images/targetground_ceshi.png", name: 'duck', date: '2019-11-10', text: '', color: "#FFCC66", tag: '运动', percent: "60%" }
    ],
    Progresslist_test1: [{ avatar: "/images/targetground_ceshi.png", name: 'duck', date: '2019-11-10', text: '', color: "#D4F9C8", tag: '技能', percent: "40%" }
    ]

  },

  
  getProgresslist: function () {
    this.setData({
      Progresslist: this.data.Progresslist.concat(this.data.Pogresslist_test1)
    });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Progresslist: this.data.Progresslist.concat(this.data.Progresslist_test1)
    });
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