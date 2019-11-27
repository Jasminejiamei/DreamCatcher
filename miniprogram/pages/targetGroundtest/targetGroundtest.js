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
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload:true
  //   }).get().then(res => {
  //     console.log(res);
  //     //当前这个用户还未添加过目标
  //     this.setData({
  //         targetGround: res.data,
  //     })  
  //   })
  // },

  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload: true
  //   }).get().then(res => {
  //     console.log(res);
  //     // for(var i=0;i<res.data.length;i++){
  //     //   if (res.data[i].isAnonymous==false){
  //     //     db.collection('userInformation').where({
  //     //       _openid: res.data[i]._openid
  //     //     }).get().then(res=>{
  //     //       var nickName = res.data.nickName
  //     //       var avatarUrl = res.data.avatarUrl
  //     //   })
  //       this.setData({
  //         targetGround: this.data.targetGround.concat(fes.data+nickName+avatarUrl),
  //       })
  //     }
  //   //})
  // },

  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload: true
  //   }).get().then(res => {
  //     console.log(res);
  //     for (var i = 0; i < res.data.length; i++) {
  //       var obj = {};
  //       //var nickName;
  //       //var avatarUrl;
  //       obj._openid = res.data[i]._openid;
  //       obj.endtime = res.data[i].endtime;
  //       obj.isAnonymous = res.data[i].isAnonymous;
  //       obj.isUpload = res.data[i].isUpload;
  //       obj.targetDetail = res.data[i].targetDetail;
  //       obj.targetLabel = res.data[i].targetLabel
  //       if (!res.data[i].isAnonymous) {
  //         console.log(res.data[i])
  //         //console.log(res.data[i]._openid)
  //         console.log(i)
  //         db.collection('userInformation').where({
  //           _openid: res.data[i]._openid
  //         }).get().then(res => {
  //           console.log(i)
  //           // var that = this;
  //           // var obj = {};
  //           // console.log(res.data)
  //           //nickName = res.data[0].nickName;
  //           //avatarUrl = res.data[0].avatarUrl;
  //           obj.nickName = res.data[0].nickName;
  //           obj.avatarUrl = res.data[0].avatarUrl;
  //           console.log(obj.nickName)
  //           console.log(obj.avatarUrl)
  //           // console.log(NAME)
  //           // console.log(URL)
  //           // var nik = "targetGround[" + i + "].nickName"
  //           // var ava = "targetGround[" + i + "].avatarUrl";
  //           //console.log(nickName)
  //           //console.log(avatarUrl)
  //           // this.setData({
  //           //   [nik]: nickName,
  //           //   [ava]: avatarUrl
  //           // })
  //           // let targetGround = that.data.targetGround;
  //           // targetGround.push(obj);
  //           // that.setData({ targetGround })
  //         })
  //       }
  //       //console.log(NAME)
  //       // obj.nickName = NAME;
  //       //console.log(nickName)
  //       //obj.nickName = "遇见";
  //       //obj.avatarUrl = "为啥就不对！";
  //       let targetGround = this.data.targetGround;
  //       targetGround.push(obj);
  //       this.setData({ targetGround })
  //       //console.log(that.data.targetGround)
  //     }
  //   })
  // },

  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload: true
  //   }).get().then(res =>{
  //     //console.log(res);
  //     for (var i = 0; i < res.data.length; i++) {
  //       var obj = {};
  //       obj._openid = res.data[i]._openid;
  //       obj.endtime = res.data[i].endtime;
  //       obj.isAnonymous = res.data[i].isAnonymous;
  //       obj.isUpload = res.data[i].isUpload;
  //       obj.targetDetail = res.data[i].targetDetail;
  //       obj.targetLabel = res.data[i].targetLabel;
  //       obj.nickName = '';
  //       obj.avatarUrl = '';
  //       let targetGround = this.data.targetGround;
  //       targetGround.push(obj);
  //       this.setData({ targetGround })
  //       if (!res.data[i].isAnonymous) {
  //         var j = i
  //         console.log(j)
  //         db.collection('userInformation').where({
  //           _openid: res.data[i]._openid
  //         }).get().then(res=>{
  //           console.log(j)
  //           console.log('hhhh')
  //           var nickName = "targetGround[" + j + "].nickName"
  //           console.log(nickName)
  //           var avatarUrl = "targetGround[" + j + "].avatarUrl"
  //           this.setData({
  //             [nickName]: res.data[0].nickName,
  //             [avatarUrl]: res.data[0].avatarUrl
  //           })
  //           console.log(res.data[0].nickName)
  //         })
  //       }
  //     }
  //   })
  // },


  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload: true
  //   }).get().then(res =>{
  //     console.log(res);
  //     for (var i = 0; i < res.data.length; i++) {
  //       var obj = {};
  //       var nickName;
  //       var avatarUrl;
  //       obj._openid = res.data[i]._openid;
  //       obj.endtime = res.data[i].endtime;
  //       obj.isAnonymous = res.data[i].isAnonymous;
  //       obj.isUpload = res.data[i].isUpload;
  //       obj.targetDetail = res.data[i].targetDetail;
  //       obj.targetLabel = res.data[i].targetLabel
  //       console.log(i)
  //       if (!res.data[i].isAnonymous) {
  //         //console.log(res.data[i])
  //          //console.log(res.data[i]._openid)
  //         console.log(i)
  //         db.collection('userInformation').where({
  //           _openid: res.data[i]._openid
  //         }).get().then(res=>{
  //           // var that = this;
  //           //var obj = {};
  //           //obj.nickName = res.data[0].nickName;
  //           //obj.avatarUrl = res.data[0].avatarUrl;
  //           // console.log(res.data)
  //           // var temp = {};
  //           //name = "targetGround[" + j + "].nickName";
  //           // temp[name] = res.data[0].nickName;
  //           // this.setData(temp);
  //           //url = "targetGround[" + j + "].nickName";
  //           // temp[url] = res.data[0].avatarUrl;
  //           // this.setData(temp);
  //           nickName = res.data[0].nickName;
  //           avatarUrl = res.data[0].avatarUrl;
  //           //console.log(i);
  //           console.log(nickName);
  //           console.log(avatarUrl);
  //           // console.log(NAME)
  //           // console.log(URL)
  //           // var nik = "targetGround[" + i + "].nickName"
  //           // var ava = "targetGround[" + i + "].avatarUrl";
  //           //console.log(nickName)
  //           //console.log(avatarUrl)
  //           // this.setData({
  //           //   [nik]: nickName,
  //           //   [ava]: avatarUrl
  //           // })
  //           // let targetGround = this.data.targetGround;
  //           // targetGround.push(obj);
  //           // this.setData({ targetGround })
  //         })
  //         console.log(i)
  //       }
  //       //console.log(NAME)
  //       // obj.nickName = NAME;
  //       obj.nickName = nickName;
  //       obj.avatarUrl = avatarUrl;
  //       //this.data.targetGround.concat(obj);
  //       let targetGround = this.data.targetGround;
  //       targetGround.push(obj);
  //       this.setData({ targetGround })
  //       //console.log(that.data.targetGround)
  //     }
  //   })
  // },

  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload: true
  //   }).get().then(res=>{
  //     console.log(res);
  //   })
  //   for(var i=0;i<res.data.length;i++){
  //     if (res.data[i].isAnonymous == false){
  //       console.log(res.data[i])
  //       db.collection('userInformation').where({
  //         _openid: res.data[i]._openid
  //       }).get().then(res=>{
  //         var nickName = res.data[0].nickName
  //         var avatarUrl = res.data[0].avatarUrl
  //         console.log(nickName)
  //       })
  //     }
  //   }
  // },



  // onLoad: function (options) {
  //   db.collection('target').where({
  //     isUpload: true
  //   }).get().then(res => {
  //     console.log(res);
  //     this.setData({
  //       targetGround: res.data,
  //     })
  //     console.log(this.data.targetGround.length)
  //     for (var i = 0; i < this.data.targetGround.length; i++) {
  //       //console.log(i)
  //       //console.log(this.data.targetGround[i])
  //       if (this.data.targetGround[i].isAnonymous == false) {
  //         //console.log(this.data.targetGround[i]._openid)
  //         db.collection('userInformation').where({
  //           _openid: this.data.targetGround[i]._openid
  //         }).get().then(res => {
  //           //console.log(res.data[0])
  //           //console.log(res.data)
  //           var userInfo = []
  //           userInfo.nickName = res.data[0].nickName
  //           userInfo.avatarUrl = res.data[0].avatarUrl
  //           //console.log(nickName)  
  //           //this.setData(userInfo)
  //           this.setData({
              
  //           })
  //         })
  //       }
  //     }
  //   })
  //   // for(var i=0;i<this.data.targetGround.length;i++){
  //   //   console.log(i)
  //   //   //console.log(this.data.targetGround[i])
  //   //   //if(this.data.targetGround[i].is)
  //   // }
  // },

  //发现了一点点规律
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
  
  //如果目标广场没有目标该如何处理
  // clickXin: function (e) {
  //   INDEX = e.target.dataset.attentionindex;
  //   db.collection('likeIt').add({
  //     data:{
  //       endtime: this.data.targetGround[INDEX].endtime,
  //       isAnonymous: this.data.targetGround[INDEX].isAnonymous,
  //       isUpload: this.data.targetGround[INDEX].isUpload,
  //       targetDetail: this.data.targetGround[INDEX].targetDetail,
  //       targetLabel: this.data.targetGround[INDEX].targetLabel,

  //     }
  //   }).then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // },

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