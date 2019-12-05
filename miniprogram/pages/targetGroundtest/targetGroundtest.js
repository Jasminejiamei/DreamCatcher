// pages/targetGroundtest/targetGroundtest.js
const db = wx.cloud.database()
var INDEX = '' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetGround: [],
    likeIt:[],
    userInfo:[],
    myattentiontarget:[],
    targetProgress:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 从target数据库根据isUpload将数据放入targetGround,然后在targetGround根据isAnonymous去遍历
  // userInfo数组，把昵称和头像放入targetGround
  onLoad: function (options) {
    db.collection('userInformation').get().then(res=>{
      var that = this
      that.setData({
         userInfo:res.data
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
        obj.nickName = '';
        obj.avatarUrl = '';

        let targetGround = this.data.targetGround;
        targetGround.push(obj);
        this.setData({ targetGround })
     
      }
      for (var i = 0; i < this.data.targetGround.length; i++) {
        if (this.data.targetGround[i].isAnonymous == false) {
          for(var j = 0;j < this.data.userInfo.length; j++){
            if (this.data.userInfo[j]._openid == this.data.targetGround[i]._openid){
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
  
  
  //点击关注目标
  clickXin: function (e) {
    console.log(e)
    INDEX = e.target.dataset.attentionindex;
    db.collection('likeIt').add({
      data:{
        endtime: this.data.targetGround[INDEX].endtime,
        isAnonymous: this.data.targetGround[INDEX].isAnonymous,
        isUpload: this.data.targetGround[INDEX].isUpload,
        targetDetail: this.data.targetGround[INDEX].targetDetail,
        targetLabel: this.data.targetGround[INDEX].targetLabel,
        targetId:INDEX

      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },

  //再一次点击时取消关注（关键我不知道是第一次点击这个心，还是已经第二次点击这个心了，我就统一在wxml数组渲染的同一个一方设置了两个data的索引：一个是attentionindex，另一个是cancelattentionindex
  clickXin: function(e){
     INDEX = e.target.dataset.cancelattentionindex;
    db.collection('likeIt').where({
      _openid: this.data.targetGround[INDEX]._openid,
      targetId: INDEX
    }).get().then(res=>{
      var dataid = res.data[0]._id
      db.collection('likeIt').doc(dataid).remove().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  })
},


////////////////////////////////////////////////////////////////////////////
  // 这是targetProgress的js的onLoad函数，我就暂时写在这里了,逻辑很类似,是获取我的关注的目标信息到data数组中
  //到时你要测试上面的onLoad函数时，先把这部分代码注释掉就好了
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
        obj.nickName = '';
        obj.avatarUrl = '';

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

///////////////////////////////////////////////////////////////////////


//这个函数可以不用管！！！
  addRecord: function () {
    db.collection('target').add({
      data: {
        endtime: "2019-11-20",
        isAnonymous: false,
        isUpload: true,
        targetDetail: "跑十圈",
        targetLabel: "运动"
      }
    }).then(res => {
      console.log(res);
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