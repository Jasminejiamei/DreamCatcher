// miniprogram/pages/login.js
var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   
  },
  onLoad: function () {
    // var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo'
        ]) {
          wx.getUserInfo({
            success: function (res) {
              //获取用户信息
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              console.log(res.userInfo);
              //用户已经授权过
              wx.switchTab ({
                url: '../dcIndex/dcIndex',
              })
            }
          });
        }
      }
    })
  },
  
  bindGetUserInfo: function (e) {
    const db = wx.cloud.database();
    // const user = db.collection('userInformation');
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //插入登录的用户的相关信息到数据库
      db.collection('userInformation').add({
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
        },
        success: function (res) {
          console.log("登录成功");
        }
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab ({
        url: '../dcIndex/dcIndex',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  onShow: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
 
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
})
//login.js
//获取应用实例



