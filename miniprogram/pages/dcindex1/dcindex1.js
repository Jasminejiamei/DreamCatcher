// miniprogram/pages/dcindex1/dcindex1.js
const db = wx.cloud.database()
var INDEX = '' //获取用户点击了的标签对应的目标的index

Page({

  /**
   * 页面的初始数据
   */

  data: {
   targetday:'___',
   show:0,
   date:'2019-12-05',
   focus:false,
   targetindex:0,
   targets:[],  //应该是dcindextest里的数组，但是我不会调
   lookfortarget: [], //当用户点击了某个标签后存放此标签对应的目标记 
  },

  /**
   * 监听页面加载,获取当前用户目标
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
          wx.showToast({
            title: '当前没有目标噢！',
            icon: 'none',
            duration: 2000
          })
        } else {
          this.setData({
            targets: res.data,
            nowTime: new Date(),
          })
          // console.log(this.data.targets);
        }
      })
    })
  },
  // 添加目标页面
  lick:function(){
    wx.navigateTo({
      url: '../addTarget/addTarget',
    })
  },

  //新的目标详情以及结束时间的参数待传，后台数据库定义的日期是字符串类型
  updateTarget: function (INDEX, endtime, targetDetail) {
    var that = this;
    var index = this.data.targets[INDEX]._id;
    db.collection('target').doc(index).update({
      // data 传入需要局部更新的数据：time,context
      data: {
        endtime: endtime,
        targetDetail: targetDetail
      }
    }).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: '修改成功!',
        duration: 3000,
        success: res => {
          that.setData({
            show: 0,
          });
          that.onLoad();
        }
      })
    })
  },

  /**
   * 表单修改
   */
  formSubmit:function(e){
    INDEX = this.data.lookfortarget.targetindex;
    this.setData({
      date: this.data.date,
    })
    var endtime = this.data.date;
    var targetDetail = this.data.changecontent;
    this.updateTarget(INDEX,endtime,targetDetail);
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      changecontent: e.detail.value,
    })
    // console.log(this.data.changecontent)
  },
  

  /**
   * 点击第一个目标
   * 
   */
  target1: function (event) {
    this.setData({
      show: 1,
      targetindex:0,
      lookfortarget:this.data.targets[0],
      date: this.data.targets[0].endtime
    })
    this.data.lookfortarget.targetindex = this.data.targetindex;
    // console.log(this.data.date)
  },
  target2: function (event) {
    this.setData({
      show: 1,
      targetindex:1,
      lookfortarget: this.data.targets[1],
      date: this.data.targets[1].endtime
    })
    this.data.lookfortarget.targetindex = this.data.targetindex;
  },
  target3: function (event) {
    this.setData({
      show: 1,
      targetindex: 2,
      lookfortarget: this.data.targets[2],
      date: this.data.targets[2].endtime
    })
    this.data.lookfortarget.targetindex = this.data.targetindex;
  },
  target4: function (event) {
    this.setData({
      show: 1,
      targetindex: 3,
      lookfortarget: this.data.targets[3],
      date: this.data.targets[3].endtime
    })
    this.data.lookfortarget.targetindex = this.data.targetindex;
  },
  target5: function (event) {
    this.setData({
      show: 1,
      targetindex: 4,
      lookfortarget: this.data.targets[4],
      date: this.data.targets[4].endtime
    })
    this.data.lookfortarget.targetindex = this.data.targetindex;
  },
   /**
   * 关闭第一个目标
   * 
   */
  closedream:function(event){
    this.setData({
      show:0
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
    })
  },

  jisuan:function(event){
    var t=new Date();
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var date = t.getDate(); 
    var startTime = year+'-'+month+'-'+date;
    // console.log(startTime);
    // console.log(this.data.lookfortarget.endtime);
    var startdate=new Date(startTime.replace(/-/g,"/"));
    var enddate = new Date(this.data.lookfortarget.endtime.replace(/-/g, "/"));
    // console.log(startdate,enddate);
    var ms=enddate.getTime()-startdate.getTime();
    var newdays = parseInt(ms / (1000*60*60*24));
    // console.log(newdays);
    this.setData({ 
        targetday:newdays
    })
  },
  clickdelete:function(event){
    INDEX = this.data.lookfortarget.targetindex;
    // console.log(INDEX);
    this.deleteTarget(INDEX);
  },
  deleteTarget: function (INDEX) {
    var index = this.data.targets[INDEX]._id;
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          db.collection('target').doc(index).remove()
            .then(res => {
              wx.showToast({
                title: '删除成功',
                icon: '删除成功!',
                duration: 1000,
                success:res=>{
                  that.setData({
                    targets:[],
                    show:0
                  });
                  that.onLoad();
                }
              });
            }).catch(err => {
              console.log(err);
            })
        }
      }
    })
  },

  onShow(){
    this.onLoad();
  }
})

