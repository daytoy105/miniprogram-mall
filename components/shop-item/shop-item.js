Component({
  properties:{
    cont_height:{
      type:String,
      value:''
    }
  },
  data:{
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
    no_more:0
  },
  methods:{
    _more: function () {
      let {
        shop_list
      } = this.data
      let img = ['http://a3.vimage1.com/upload/merchandise/pdcvis/610264/2018/0612/40/94f80dda-ee92-412c-aa2e-f9c3a3a78b43_5t.jpg', 'http://a3.vimage1.com/upload/merchandise/pdcvis/2018/07/23/179/c667a9f5-dee4-40d3-a174-876fa2dee1a4_5t.jpg', 'http://a4.vimage1.com/upload/merchandise/pdcvis/2018/06/12/71/6d215cc1-e1ab-45a6-ab47-5199a3d250f8_5t.jpg', 'http://a4.vimage1.com/upload/merchandise/pdcvis/2018/06/29/39/87eed182-82f1-4dd1-809f-12c182a4a4f8_5t.jpg']
      if (shop_list.length > 8) {
        this.setData({
          no_more: 1
        })
        return
      }
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
      this.setData({
        shop_list: shop_list
      })
      this.triggerEvent('more')   // 触发父组件事件
    },
    jump_detail: function () {
      wx.navigateTo({
        url: '../detail/index'
      })
    },
    scroll:function(){
      console.log('滚动了')
    }
  }
})