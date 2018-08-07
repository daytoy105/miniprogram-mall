//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    tab: [{
      id: 'produce',
      txt: '商品'
    }, {
      id: 'introduce',
      txt: '推荐'
    }, {
      id: 'detail',
      txt: '详情'
    }],
    content: {
      preview: [{
          simg: 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/86/3920c472-a96c-486a-a05d-d450f0f927f6_720x909_70.jpg',
          bimg: ['http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/86/3920c472-a96c-486a-a05d-d450f0f927f6_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/175/55272239-2890-41c4-b0f0-c3f3bfe5bf1f_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/42/ca4c5675-5126-4a8d-9331-ec1ad3ffbcfc_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/97/919d9983-fa45-466e-a061-e4c9c019bd26_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/117/6573467f-a290-4ac2-85cf-ef0fe70d3d3d_720x909_70.jpg']
        },
        {
          simg: 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/175/55272239-2890-41c4-b0f0-c3f3bfe5bf1f_720x909_70.jpg',
          bimg: ['http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/86/3920c472-a96c-486a-a05d-d450f0f927f6_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/175/55272239-2890-41c4-b0f0-c3f3bfe5bf1f_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/42/ca4c5675-5126-4a8d-9331-ec1ad3ffbcfc_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/97/919d9983-fa45-466e-a061-e4c9c019bd26_720x909_70.jpg', 'http://a.vimage1.com/upload/merchandise/pdcvis/2018/05/17/117/6573467f-a290-4ac2-85cf-ef0fe70d3d3d_720x909_70.jpg']
        }
      ],
      price: '124',
      old_price: '518',
      new_price: '99.2',
      shop_name: '2018夏季新款韩版女装连衣裙夏装春夏休闲印花拼接通勤气质原宿风宽松显瘦直筒短裙连衣裙显瘦直筒短裙连衣裙显瘦直筒短裙连衣裙刺绣连衣裙',
      sizes: [{
        size: 'S',
        detail: [{
          name: '号型',
          num: '160/80A'
        }, {
          name: '胸围',
          num: '86'
        }, {
          name: '臀围',
          num: '110'
        }, {
          name: '裙长',
          num: '86'
        }]
      }, {
        size: 'M',
        detail: [{
          name: '号型',
          num: '165/84A'
        }, {
          name: '胸围',
          num: '90'
        }, {
          name: '臀围',
          num: '114'
        }, {
          name: '裙长',
          num: '88'
        }]
      }, {
        size: 'L',
        detail: [{
          name: '号型',
          num: '170/88A'
        }, {
          name: '胸围',
          num: '94'
        }, {
          name: '臀围',
          num: '118'
        }, {
          name: '裙长',
          num: '90'
        }]
      }, {
        size: 'XL',
        detail: [{
          name: '号型',
          num: '175/92A'
        }, {
          name: '胸围',
          num: '98'
        }, {
          name: '臀围',
          num: '122'
        }, {
          name: '裙长',
          num: '91'
        }]
      }, {
        size: 'XL',
        detail: [{
          name: '号型',
          num: '175/92A'
        }, {
          name: '胸围',
          num: '98'
        }, {
          name: '臀围',
          num: '122'
        }, {
          name: '裙长',
          num: '91'
        }]
      }]
    },
    pindex: 0,
    did: 0,
    size_index: -1,
    size_pop: 0,
    pop_left: 0,
    scroll_y: 0,
    scroll_id: 'produce',
    cont_height: 800,
    dy: 0,
    intro_height: 0,
    detail_height: 0
  },
  onLoad: function(e) {
    // this.setData({
    //   did: e.did
    // })
    let {
      content,
      content: {
        price,
        old_price
      }
    } = this.data
    content.discount = (price / old_price * 10).toFixed(1)
    this.setData({
      content: content
    })

  },
  onReady: function() {
    let sy = 0,
      hy = 0,
      by = 0
    wx.getSystemInfo({
      success: function(res) {
        sy = res.windowHeight
      },
    })
    let that = this
    wx.createSelectorQuery().select('.cart_wrap').boundingClientRect(function(rect) {
      by = rect.height
    }).exec()
    wx.createSelectorQuery().select('.detail_header').boundingClientRect(function(rect) {
      hy = rect.height
    }).exec()
    wx.createSelectorQuery().select('.detail_shop_info').boundingClientRect(function(rect) {
      that.setData({
        cont_height: sy - hy - by,
        dy: rect.top - hy
      })
    }).exec()
    wx.createSelectorQuery().select('.introduce').boundingClientRect(function(rect) {
      that.setData({
        intro_height: rect.top - hy
      })
    }).exec()
    wx.createSelectorQuery().select('.detail').boundingClientRect(function(rect) {
      that.setData({
        detail_height: rect.top - hy
      })
    }).exec()
  },

  preview: function(e) {
    let {
      content: {
        preview
      }
    } = this.data
    //console.log()
    let num = e.currentTarget.dataset.num
    wx.previewImage({
      current: preview[num],
      urls: preview
    })
  },
  change_type: function(e) {
    let num = e.currentTarget.dataset.num
    this.setData({
      pindex: num
    })
  },
  choose_size: function(e) {
    let num = e.currentTarget.dataset.num
    let x = e.currentTarget.offsetLeft
    this.setData({
      size_index: num,
      pop_left: x,
      size_pop: 1
    })

  },
  close_size: function() {
    this.setData({
      size_pop: 0
    })
  },
  join_cart: function() {
    let {
      size_index,
      dy
    } = this.data
    if (size_index == -1) {
      wx.showToast({
        title: '请选择一个尺码',
        icon: 'none'
      })
      this.setData({
        scroll_y: dy
      })
      return
    }
  },
  scroll_tab: function(e) {
    let id = e.currentTarget.dataset.scroll_id
    this.setData({
      scroll_id: id
    })
  },
  scroll: function(e) {
    let {
      intro_height,
      detail_height,
      scroll_id
    } = this.data
    let t = e.detail.scrollTop
    let id = ''
    if (t < intro_height) {
      id = 'produce'
    }
    if (t >= intro_height && t < detail_height) {
      id = 'introduce'
    }
    if (t >= detail_height) {
      id = 'detail'
    }
    if (id == scroll_id) {
      return
    }
    this.setData({
      scroll_id: id
    })
  }
})