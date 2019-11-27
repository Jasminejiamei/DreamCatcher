// pages/targetGroundtest/targetGroundtest.js
const db = wx.cloud.database()
var INDEX = '' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetGround: [],
    likeIt:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //从target数据库根据isUpload将数据放入targetGround,然后在targetGround根据isAnonymous去请求
  //userInformation数据库，把昵称和头像放入targetGround
  onLoad: function(options) {
    var index = []
    db.collection('target').where({
      isUpload: true
    }).get().then(res=>{
      console.log(res);
      for (var i = 0; i < res.data.length; i++){
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
        if(!res.data[i].isAnonymous){
          index[i]=i
        }
      }
      console.log(this.data.targetGround.length)
      console.log(index)
      for (var i = 0; i < this.data.targetGround.length; i++){
        console.log(i)
        if (this.data.targetGround[i].isAnonymous == false){
          console.log(i)
          db.collection('userInformation').where({
            _openid: this.data.targetGround[i]._openid
          }).get().then(res=>{
            console.log(i)
            var nickName = "targetGround[" + i + "].nickName"
            console.log(nickName)
            var avatarUrl = "targetGround[" + i + "].avatarUrl"
            this.setData({
              [nickName]: res.data[0].nickName,
              [avatarUrl]: res.data[0].avatarUrl
            })
            console.log(res.data[0].nickName)
          })
        }
      }
    })
  },
  
 
  clickXin: function (e) {
    INDEX = e.target.dataset.attentionindex;
    db.collection('likeIt').add({
      data:{
        endtime: this.data.targetGround[INDEX].endtime,
        isAnonymous: this.data.targetGround[INDEX].isAnonymous,
        isUpload: this.data.targetGround[INDEX].isUpload,
        targetDetail: this.data.targetGround[INDEX].targetDetail,
        targetLabel: this.data.targetGround[INDEX].targetLabel,

      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },

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

  myAttentiontarget: function(e) {
     
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