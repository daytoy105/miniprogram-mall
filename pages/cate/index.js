//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    cate_list:['为你推荐','女装','男装','男女内衣','女鞋','男鞋','箱包皮具','手表配饰','护肤彩妆','个人护理','母婴','运动户外','手机数码','家用电器','家居家纺','家具家装','生活超市','唯品国际','唯品优选','唯品·奢','图书'],
    current:0,
    sy:500,
    shops: [{ img:'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/03/06/162/15202998439847_200x375_80.png!75.webp',txt:'连衣裙'},
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/04/25/92/15246482342239_200x375_80.jpg!75.webp', txt: 'T恤' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/04/25/175/15246483854406_200x375_80.png!75.webp', txt: '套装' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/05/17/194/15265476037276_200x375_80.jpg!75.webp', txt: '短裤' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/07/13/142/15314757239317_200x375_80.png!75.webp', txt: '外套' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/07/13/187/15314768565659_200x375_80.png!75.webp', txt: '卫衣' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/04/25/120/15246483648144_200x375_80.png!75.webp', txt: '衬衫' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/07/22/76/15322504099297_200x375_80.png!75.webp', txt: '半身裙' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/category/2017/12/10/82/9d3f5546-6645-4cab-b821-91b186eee3d4_200x375_80.jpg!75.webp', txt: '牛仔裤' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/06/19/146/15293757683570_200x375_80.png', txt: '碎花连衣裙' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/06/11/199/15286875673921_200x375_80.png', txt: '纯色连衣裙' },
      { img: 'http://h2.appsimg.com/a.appsimg.com/upload/goadmin/2018/03/05/163/15202633478096_200x375_80.jpg', txt: '卫衣' }
      ]
  },
  onLoad: function () {
    console.log(this.route)
    let that = this
    wx.getSystemInfo({
      success: function(res) {
         that.setData({
           sy: res.windowHeight
         })
      },
    })
  },
  change_cate:function(e){
    let target = e.currentTarget;
    this.setData({
      current:target.dataset.num
    })
  },
  jump_list:function(e){
    wx.navigateTo({
      url: '../list/index'
    })
  }
})