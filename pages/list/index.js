//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    flag: 0,
    flag2: 0,
    navs: [{
      'type': '版型',
      'list': ['紧身', '修身', '常规', '直筒', '宽松', '收腰']
    }, {
      'type': '裙型',
      'list': ['蛋糕裙', '铅笔裙', '伞裙', '仙女裙', '运动裙', '鱼尾裙', '蓬蓬裙', '花苞裙', 'A字裙', '不对称']
    }, {
      'type': '裙长',
      'list': ['长裙', '中长裙', '短裙', '超短裙', '前短后长']
    }, {
      'type': '颜色',
      'list': ['银色', '青色', '咖色', '驼色', '杏色', '米色', '祼色', '裸色', '花色', '黄色', '棕色', '橙色', '白色', '绿色']
    }],
    nav_index: -1,
    choose_txt:[],
    tmp_choose: [{},{},{},{}],
    choose:[{},{},{},{}],
    
    cont_height: 300,
    no_more:0
  },
  onLoad: function() {
    console.log(this.route)
    let sh = 0
    wx.getSystemInfo({
      success: function(res) {
        sh = res.windowHeight
      }
    })
    let that = this
    wx.createSelectorQuery().select('.cl_top').boundingClientRect(function(rect) {
      console.log(rect.height)
      let h = sh - rect.height
      that.setData({
        cont_height: h
      })
    }).exec()
  },
  onReady:function(){
    this.shopItem = this.selectComponent("#shop-item");
  },
  sort_price: function() {
    let {
      flag
    } = this.data
    flag = flag == 0 ? 1 : flag == 1 ? 2 : 0
    this.setData({
      flag: flag,
      flag2: 0
    })
  },
  sort_discount: function() {
    let {
      flag2
    } = this.data
    flag2 = flag2 == 0 ? 1 : flag2 == 1 ? 2 : 0
    this.setData({
      flag2: flag2,
      flag: 0
    })
  },
  select_nav: function(e) {
    let num = e.currentTarget.dataset.num
    let { choose } = this.data
    this.setData({
      nav_index: num,
      tmp_choose: choose
    })
  },
  cancel_nav: function(e) {
    this.setData({
      nav_index: -1,
       
    })
  },
  choose_pop: function(e) {
    let num = e.currentTarget.dataset.num
    let opt = e.currentTarget.dataset.opt
    let pid = e.currentTarget.dataset.pid
    let { tmp_choose = [] } = this.data
    let tmp = tmp_choose[pid] || []
    tmp.id = tmp.id || []
    tmp.selected = tmp.selected || []
    tmp.opt = tmp.opt || []
    if (tmp.id.indexOf(num)!=-1) {
      tmp.id = tmp.id.filter(k => k != num)
      tmp.opt = tmp.opt.filter(k => k != opt)
      tmp.selected[num] = 0
    } else {
      if (tmp.id.length > 4) {
        console.log('no more')
        wx.showToast({
          title:'最多选择5个'
        })
        return
      }
      tmp.id = tmp.id.concat(num)
      tmp.selected[num]= 1
      tmp.opt = tmp.opt.concat(opt)
      tmp_choose[pid] = tmp
    }
    this.setData({
      tmp_choose: tmp_choose
    })
  },
  reset: function() {
    let { tmp_choose, nav_index } = this.data
    tmp_choose[nav_index] = {}
    this.setData({
      tmp_choose: tmp_choose
    })
  },
  confirm: function() {
    let { nav_index, tmp_choose} = this.data
    tmp_choose[nav_index].opt2 = tmp_choose[nav_index].opt && tmp_choose[nav_index].opt.length ? tmp_choose[nav_index].opt.join('、'):''
    this.setData({
      nav_index:-1,
      choose: tmp_choose
    })
  },
  _more2:function(e){
    this.shopItem.scroll()   //  调用子组件的事件
    console.log(e)
  }
})