// miniprogram/pages/addTarget/addTarget.js
// 用于导入消息通知notify
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
const db = wx.cloud.database();
//判断是否传入数据库
var canSend;
//获取标签id
let id;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    check: false,
    idUpload: false,
    isAnonymous: false,
    buttons: [
      { id: 1, name: '学习', src: 'edit' },
      { id: 2, name: '旅游', src: 'logistics' },
      { id: 3, name: '技能', src: 'award-o' },
      { id: 4, name: '其他', src: 'good-job-o' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var time =util.formatTime(new Date());
    wx.setNavigationBarTitle({
      title: '添加目标',
    }),
      // 默认第一个按钮被选中
      this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
      nowTime: new Date()
    })
  },

  // 时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 获取输入文本
  targetContent: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  // 设置选中标签
  radioButtonTap: function (e) {
    // 选中的id
    id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
      }
      else {
        //其他的位置为false
        this.data.buttons[i].checked = false;
      }
    }
    this.setData({
      buttons: this.data.buttons,
      msg: "id:" + id
    })
  },
  // 复选框
  onChange(event) {
    this.setData({
      checked: event.detail,
      check: !this.data.check
    });
    // 如果选中了则弹出询问是否需要匿名框
    if (this.data.check == false) {
      console.log("不要发布广场");
    } else {
      this.setData({
        modalHidden: !this.data.modalHidden,
        isUpload: !this.data.isUpload
      });
    }
  },
  // 保存点击事件需要检查输入的内容
  addTarget: function (e) {
    //检查信息是否填写完整
    if (this.data.date == null || this.data.content == null) {
      Notify('信息填写不完整，请检查时间和目标');
    } else {
      // let id = e.currentTarget.dataset.id;
      for (let i = 0; i < this.data.buttons.length; i++) {
        if (this.data.buttons[i].id == id) {
          this.data.targetLabel = this.data.buttons[i].name
        }
      }
      console.log("标签：" + this.data.targetLabel);
      //将数据写入数据库中
      db.collection('target').add({
        data: {
          endtime: this.data.date,
          targetDetail: this.data.content,
          targetLabel: this.data.targetLabel,
          isUpload: this.data.isUpload,
          isAnonymous: this.data.isAnonymous
        }
      }).then(res => {
        console.log(res);
        //成功返回成功提示
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1500,
          mask: true
        });
        wx.switchTab({
          url: '../dcIndex/dcIndex',
        })
        this.onLoad();
      }).catch(err => {
        console.log(err);
      });
    }
  },
  // 确认匿名,需要给后台传匿名
  modalBindconfirm() {
    this.setData({
      modalHidden: !this.data.modalHidden,
      isAnonymous: !this.data.isAnonymous
    });
    wx.showToast({
      title: '匿名成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  },
  // 不要匿名
  modalBindcancel() {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });
    this.setData({
      modalHidden: !this.data.modalHidden,
      isAnonymous: !this.data.isAnonymous
    });
  }
})