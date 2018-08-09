import tempObj from '../template/index'
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: ['../../images/banner/01.jpg', '../../images/banner/02.jpg', '../../images/banner/03.jpg','../../images/banner/04.jpg'],
    cate_list: ['精选', '时尚', '国际', '美妆', '母婴', '家电', '家居', '生活', '唯品·奢', '女装', '鞋包', '男装', '运动户外','家居家纺','数码家电','大家电','家具家装','手表配饰','男女内衣','唯风尚'],
    selected:0,
    all_cate:0,
    xscroll:0,
    init:0
  },
  onReady:function(){
    this.shopItem = this.selectComponent("#shop-item1");
  },
  onLoad: function () {
    let that = this
    // tab分类的初始距离
    wx.createSelectorQuery().select('#cate_0').boundingClientRect(function (rect) {
      that.setData({
        init: rect.left
      })
    }).exec()
    wx.setNavigationBarTitle({
      title: '首页',
    })
    //console.log(this.route)
  },
  
  jump_cate:function(e){
    wx.navigateTo({
      url: '../cate/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  show_cate:function(e){
    this.setData({
      all_cate: !this.data.all_cate
    })
  },
  select_cate:function(e){
    let target = e.currentTarget
    let { init } = this.data
    this.setData({
      xscroll: target.offsetLeft - init,
      selected: target.dataset.num
    })
  },
  select_cate2: function (e) {
    let num = e.currentTarget.dataset.num
    let { init } = this.data
    let x = 0;
    let that = this
    this.setData({
      xscroll:0
    })
    wx.createSelectorQuery().select('#cate_' + num).boundingClientRect(function(rect){
      x = rect.left
      that.setData({
        xscroll: x - init,
        selected: num,
        all_cate: !that.data.all_cate
      })
    }).exec()
  },
  get_nav_info: function (num) {
     
  },
  switch_tab:function(e){
    if (e.detail.source!="touch"){
      return
    }
    let { init } = this.data
    let num = e.detail.current
    let that = this
    this.setData({
      xscroll: 0
    })
    wx.createSelectorQuery().select('#cate_' + num).boundingClientRect(function (rect) {
      that.setData({
        xscroll: rect.left - init,
        selected: num
      })
    }).exec()
  },
  // 跳转详情  获得 template 事件的对象， 子-父 
  jump_detail: function (e) {
    tempObj.jump_detail(e)
    //console.log(tempObj.data.tmp)
  },
  more:function(){
    this.shopItem._more()
  }
})