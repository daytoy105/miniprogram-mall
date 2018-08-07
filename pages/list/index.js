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
    shop_list: [{
        img: 'http://a3.vimage1.com/upload/merchandise/pdcvis/2018/06/06/21/a1235560-96f2-49be-a109-29b331b75145_5t.jpg',
        price: '239',
        pre_price: '539',
        new_price: '119.5',
        brance: '德玛纳',
        shop_name: '2018夏季新品甜美可爱女装连衣裙春夏秋装百搭女连衣裙无袖雪纺小碎花无弹显瘦女款连衣裙女',
        dis_type: '满减'
      }, {
        img: 'http://a2.vimage1.com/upload/merchandise/pdcvop/00103437/10001351/1749653182-97185486217056256-97185486217056258-50_5t.jpg',
        price: '239',
        pre_price: '539',
        new_price: '119.5',
        brance: '德玛纳',
        shop_name: '2018夏季新品甜美可爱女装连衣裙春夏秋装百搭女连衣裙无袖雪纺小碎花无弹显瘦女款连衣裙女',
        dis_type: '折扣'
      },
      {
        img: 'http://a4.vimage1.com/upload/merchandise/pdcvis/2018/05/15/32/c4e8d5ff-cb75-4f88-ac6c-24d53c0c58c8_t.jpg',
        price: '239',
        pre_price: '539',
        new_price: '119.5',
        brance: '德玛纳',
        shop_name: '2018夏季新品甜美可爱女装连衣裙春夏秋装百搭女连衣裙无袖雪纺小碎花无弹显瘦女款连衣裙女',
        dis_type: '折扣'
      },
      {
        img: '//a3.vimage1.com/upload/merchandise/pdcvis/2018/05/17/89/57e624e0-bc1f-4616-a28d-f5da33cb20de_5t.jpg',
        price: '239',
        pre_price: '539',
        new_price: '119.5',
        brance: '德玛纳',
        shop_name: '2018夏季新品甜美可爱女装连衣裙春夏秋装百搭女连衣裙无袖雪纺小碎花无弹显瘦女款连衣裙女',
        dis_type: '折扣'
      }
    ],
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
  more: function() {
    console.log('scroll')
    let {
      shop_list
    } = this.data
    let img = ['http://a3.vimage1.com/upload/merchandise/pdcvis/610264/2018/0612/40/94f80dda-ee92-412c-aa2e-f9c3a3a78b43_5t.jpg', 'http://a3.vimage1.com/upload/merchandise/pdcvis/2018/07/23/179/c667a9f5-dee4-40d3-a174-876fa2dee1a4_5t.jpg', 'http://a4.vimage1.com/upload/merchandise/pdcvis/2018/06/12/71/6d215cc1-e1ab-45a6-ab47-5199a3d250f8_5t.jpg', 'http://a4.vimage1.com/upload/merchandise/pdcvis/2018/06/29/39/87eed182-82f1-4dd1-809f-12c182a4a4f8_5t.jpg']
    for (let i = 0; i < 4; i++) {
      shop_list.push({
        img: img[i],
        price: '239',
        pre_price: '539',
        new_price: '119.5',
        brance: '德玛纳',
        shop_name: '2018夏季新品甜美可爱女装连衣裙春夏秋装百搭女连衣裙无袖雪纺小碎花无弹显瘦女款连衣裙女',
        dis_type: '折扣'
      })
    }
    if (shop_list.length > 12) {
      this.setData({
        no_more:1
      })
      return
    }
    this.setData({
      shop_list: shop_list
    })
  },
  jump_detail:function(){
    wx.navigateTo({
      url: '../detail/index'
    })
  }
})