// miniprogram/pages/targetGround/targetGround.js
const db = wx.cloud.database()
var INDEX = '' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    targetGround: [],//这是目标广场所需要的数据
    userInfo: []     //这是用户的信息
    

  },

  //获取别人的目标，然后追加到targetlist里面
  gettargetlist:function(){
    this.setData({
      targetlist: this.data.targetlist.concat(this.data.targetlist_test)
    });
  },
  //点击喜欢或撤回
  tap_like:function(e){
    console.log(e);
    var Index=e.currentTarget.dataset.index;
    // console.log(Index);
    var list = this.data.targetGround;
    for(let i in list) {
      if(i==Index){
        if(list[i].like==0){
          list[i].like=1
        }
      }
    }
    this.setData({
      targetGround: list
    })

    db.collection('likeIt').add({
      data: {
        endtime: this.data.targetGround[Index].endtime,
        isAnonymous: this.data.targetGround[Index].isAnonymous,
        isUpload: this.data.targetGround[Index].isUpload,
        targetDetail: this.data.targetGround[Index].targetDetail,
        targetLabel: this.data.targetGround[Index].targetLabel,
        targetId: Index

      }
    }).then(res => {
      // console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  tap_notlike: function (e) {
    console.log(e);
    var Index = e.currentTarget.dataset.index;
    // console.log(Index);
    var list = this.data.targetGround;
    for (let i in list) {
      if (i == Index) {
        if (list[i].like == 1) {
          list[i].like = 0
        }
      }
    }
    this.setData({
      targetGround: list
    })

    db.collection('likeIt').where({
      _openid: this.data.targetGround[Index]._openid,
      targetId: Index
    }).get().then(res => {
      var dataid = res.data[0]._id
      db.collection('likeIt').doc(dataid).remove().then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
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
    db.collection('userInformation').get().then(res => {
      var that = this
      that.setData({
        userInfo: res.data
      })
    })
    db.collection('target').where({
      isUpload: true
    }).get().then(res => {
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
        obj.like = 0;
        obj.color ="";
        console.log(obj.targetLabel);
        if (obj.targetLabel=="学习"){
          obj.color = "#D4F9C8";
        };
        
        if (obj.targetLabel=="技能") {
          obj.color = "#FFCC66";
        };

        if (obj.targetLabel == "旅行") {
          obj.color = "#A4F4F4";
        };

        if (obj.targetLabel == "其他") {
          obj.color = "#FF9999";
        };



        let targetGround = this.data.targetGround;
        targetGround.push(obj);
        this.setData({ targetGround })

      }
      for (var i = 0; i < this.data.targetGround.length; i++) {
        if (this.data.targetGround[i].isAnonymous == false) {
          for (var j = 0; j < this.data.userInfo.length; j++) {
            if (this.data.userInfo[j]._openid == this.data.targetGround[i]._openid) {
              var nickName = "targetGround[" + i + "].nickName"
              var avatarUrl = "targetGround[" + i + "].avatarUrl"
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