// miniprogram/pages/targetGround/targetGround.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

    //用于刷新
    targetlist_test: [{ avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-10', text: ' ', color: "#FFCC66", tag: '运动',attent: true,like:0},
                      { avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-01', text: '',  color: "#D4F9C8",tag: '技能',attent: true,like:0}
                     ],
    //目标列表
    targetlist: [{ avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-10', text: '',color: "#D4F9C8", tag: '技能', attent: true,like:0 }
                 ],
    //用于一开始页面加载时显示目标广场当前目标的个数
    targetlist_test1: [{ avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-10', text: '', color: "#FF9999", tag: '养生',attent: true,like:0 },
                      { avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-01', text: '', color: "#A4F4F4", tag: '旅行', attent: true,like:0 }
                      ]

  },

  //获取别人的目标，然后追加到targetlist里面
  gettargetlist:function(){
    this.setData({
      targetlist: this.data.targetlist.concat(this.data.targetlist_test)
    });
  },
  //点击喜欢或撤回
  tap_like:function(e){
    var Index=e.currentTarget.dataset.index;
    console.log(Index);
    var list=this.data.targetlist;
    for(let i in list) {
      if(i==Index){
        if(list[i].like==0){
          list[i].like=1
        }
      }
    }
    this.setData({
      targetlist: list
    })
  },
  tap_notlike: function (e) {
    var Index = e.currentTarget.dataset.index;
    console.log(Index);
    var list = this.data.targetlist;
    for (let i in list) {
      if (i == Index) {
        if (list[i].like == 1) {
          list[i].like = 0
        }
      }
    }
    this.setData({
      targetlist: list
    })
  },
  jumpto:function(){
   wx.navigateTo({
     url: '../targetProgress/targetProgress',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      targetlist: this.data.targetlist.concat(this.data.targetlist_test1)
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
    this.gettargetlist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})