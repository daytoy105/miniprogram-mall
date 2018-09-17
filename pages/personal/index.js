//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:{},
    pop_url:''
  },
  onLoad: function () {
    console.log(this.route)
  },
  onReady:function(){
    //app.globalData : 获取的速度慢
    let userInfo = wx.getStorageSync('mimiya_userInfo')
    let that = this
    // this.setData({
    //   userInfo: userInfo
    // })
    // let w = wx.getSystemInfoSync()
    // let ctx = wx.createCanvasContext('user-info')
    // ctx.drawImage(userInfo.avatarUrl, (w.windowWidth - 80) / 2, 25, 80, 80)
    // ctx.fillStyle ='#01d1ff'
    // ctx.setFontSize(22)
    // ctx.setTextAlign('center')
    // ctx.fillText(userInfo.nickName, w.windowWidth / 2 ,140)
    // ctx.save()
    // ctx.draw(true, function(){
    //   wx.canvasToTempFilePath({
    //     canvasId:'user-info',
    //     success:function(res){
    //       console.log(res.tempFilePath)
    //       // that.setData({
    //       //   pop_url: res.tempFilePath
    //       // })
    //     }
    //   })
    // })
  },
})