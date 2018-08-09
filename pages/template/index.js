var temp = {
  data:{
    tmp:'temp'
  },
  jump_detail: function (e) {
    let id = e.currentTarget.dataset.num
    // wx.navigateTo({
    //   url: '../detail/index?did='+id 
    // })
    console.log(this.data.tmp)
  }
}
export default temp