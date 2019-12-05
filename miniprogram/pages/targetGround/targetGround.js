// miniprogram/pages/targetGround/targetGround.js
const db = wx.cloud.database()
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
    targetlist_tst: [{ avatar: "https://wx.qlogo.cn/mmopen/vi_32/zHq8n3VZtXuLNlRUJkXoJqS2oj0G4CvQWXicLZZoiaZU0pr1uDaAeEBicEEWAxecvibVJG6p2FzkUsOka3fQbSv6FA/132", name: 'emily', date: '2019-11-11', text: '我要补牙',color: null, tag: '技能', like:0 }
                 ],
    //用于一开始页面加载时显示目标广场当前目标的个数
    targetlist_test1: [{ avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-10', text: '', color: "#FF9999", tag: '养生',attent: true,like:0 },
                      { avatar: "/images/targetground_ceshi.png", name: 'emily', date: '2019-11-01', text: '', color: "#A4F4F4", tag: '旅行', attent: true,like:0 }
                      ],
    userinfo:[],
    tarli:[],
    target:[]
    

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
    // console.log(Index);
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
    // console.log(Index);
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

  /*settargetlist:function(){
    var tlist=this.data.tarli;
    var ulist=this.data.userinfo;
    var temp={ avatar: null, name: null, date: null, text: null, color: null, tag: null, like: 0 };
    var temp_p={ avatar: null, name: null, date: null, text: null, color: null, tag: null, like: 0 };
    for(let t in tlist){
     console.log("1");
     temp.date=t.endtime;
     temp.attent=t.targetDetail;
     temp.tag=t.targetLabel;
     console.log(temp.date);
     temp.setData(temp_p);
    }

  },*/
  //用一个函数，处理技能与函数的对应，并把值赋给color

  /**
   * 生命周期函数--监听页面加载
   */
  /*onLoad: function (options) {
    this.setData({
      targetlist: this.data.targetlist.concat(this.data.targetlist_test1)
    });
  },*/

  /*setcolortag:function(){
    
  },*/

  onLoad: function (options) {
    //先获取用户的openid
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      //从target数据库中获取属于当前这个用户的目标
      db.collection('target').where({
      }).get().then(res => {
        //当前这个用户还未添加过目标
        if (res.data.length == 0) {
        } else {
          this.setData({
            tarli: res.data,
          })
          console.log(this.data.tarli);
        }
      })
    }),
      wx.cloud.callFunction({
        name: 'login'
      }).then(res => {
        //从target数据库中获取属于当前这个用户的目标
        db.collection('userInformation').where({
        }).get().then(res => {
          //当前这个用户还未添加过目标
          if (res.data.length == 0) {
          } else {
            this.setData({
              userinfo: res.data,
            })
            console.log(this.data.userinfo);
          }
        })
      }),
      this.settargetlist();
      console.log('a');
    
     
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