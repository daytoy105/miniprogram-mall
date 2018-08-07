//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:{},
    src: '',
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    lx: 0,
    ly: 0,
    isone: 0,
    scale:1,
    rotate: 0,
    flag:0,
    _img: {
      w:0, 
      h:0
    }
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
  handleChoose: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let img = res.tempFilePaths[0]
        let screen = wx.getSystemInfoSync()
        let sw = screen.windowWidth
        wx.getImageInfo({
          src: img,
          success: function(res) {
            that.setData({
              src: img,
              flag: 1,
              _img: {
                w: sw,
                h: sw / res.width * res.height
              }
            })
          }
        })
      }
    })
  },
 
  handleStart: function(e) {
    let t = e.touches
    let one = 1
    if (t.length>1) {
      one = 0
      let x = t[1].clientX - t[0].clientX
      let y = t[1].clientY - t[0].clientY
      this.setData({
        x1: t[1].pageX,
        y1: t[1].pageY,
      })
    }
    this.setData({
      isone:one,
      x0: t[0].pageX,
      y0: t[0].pageY
    })
  },
  handleMove: function(e) {
    let t = e.touches
    let {
      x0,
      y0,
      x1,
      y1,
      lx,
      ly,
      scale,
      rotate,
      isone
    } = this.data
    if (t.length == 2 && isone == 0) {
      let x = t[1].clientX - t[0].clientX
      let y = t[1].clientY - t[0].clientY
      // 计算角度，旋转(优先)
      var angle0 = Math.atan((y1 - y0) / (x1 - x0)) * 180 / Math.PI
      var angle = Math.atan(y / x) * 180 / Math.PI
      console.log(rotate + (angle - angle0))
      if (Math.abs(angle0 - angle) > 1) {
        this.setData({
          x0: t[0].pageX,
          y0: t[0].pageY,
          x1: t[1].pageX,
          y1: t[1].pageY,
          rotate: rotate + (angle - angle0)
        })
        
      } else {
        // 缩放 
        let diff = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) - Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2))
        scale = scale + 0.005 * diff
        if (scale < 0) {
          scale = 0.1
        }
        this.setData({
          x0: t[0].pageX,
          y0: t[0].pageY,
          x1: t[1].pageX,
          y1: t[1].pageY,
          scale: scale
        })
      }
    } else {
      console.log('move')
      // 平移
      lx = lx + t[0].pageX - x0
      ly = ly + t[0].pageY - y0
      this.setData({
        x0: t[0].pageX,
        y0: t[0].pageY,
        lx: lx,
        ly: ly
      })
    }
  },
  handleEnd: function(e) {
    this.setData({
      isone: 0
    })
  },
  handleSavePicture: function() {
    let {
      lx,
      ly,
      src,
      rotate,
      scale,
      _img,
      userInfo
    } = this.data

    let that = this
    let ctx = wx.createCanvasContext('canvas_clip')
    let cleft = 0,
      ctop = 0;
    let clip = wx.createSelectorQuery().select('.photo-clip-area').boundingClientRect(function(rect) {
      cleft = rect.left;
      ctop = rect.top;
    }).exec()
    let img = wx.createSelectorQuery().select('#uploadPreview').boundingClientRect(function(rect) { 
         //画布中点坐标转移到裁剪区域的图片中心 
      let mx = lx + _img.w / 2 - cleft 
      let my = ly + _img.h / 2 - ctop 
      ctx.translate(mx, my); 
      ctx.rotate(rotate * Math.PI / 180);
      ctx.translate(-mx, -my);
      ctx.drawImage(src, lx - _img.w * (scale - 1) / 2-cleft, ly - _img.h * (scale - 1) / 2 - ctop, _img.w * scale, _img.h * scale);
      //ctx.drawImage(src, lx - _img.w * (scale - 1) / 2 - cleft , ly - _img.h * (scale - 1) / 2 - ctop , _img.w * scale, _img.h * scale);
      ctx.draw(true,function(){
        wx.canvasToTempFilePath({
          canvasId:'canvas_clip',
          success:function(res){
            userInfo.avatarUrl = res.tempFilePath
            that.setData({
              userInfo: userInfo,
              flag: 0,
            })
            
          }
        },this)
      })
    }).exec()
    this.restart()
  },
  cancle: function() {
    this.restart()
    this.setData({
      flag: 0
    })
  },
  restart: function() {
    this.setData({
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      lx: 0,
      ly: 0,
      scale: 1,
      rotate: 0
    })
  }
})