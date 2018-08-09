//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:{},
  },
  onLoad: function () {
    console.log(this.route)
  },
  onReady:function(){
    //app.globalData : 获取的速度慢
    let userInfo = wx.getStorageSync('mimiya_userInfo')
    //console.log(app.globalData.userInfo )
    this.setData({
      userInfo: userInfo
    })
   
  },
})