// pages/detail/detail.js
const time=require("../../utils/util")
Page({
  data:{
    detail:{}
  },
  handleGetDetailDatefilm(id){
    // https://m.maizuo.com/v4/api/film/4266?__t=1532485092069
    wx.request({
      url: `https://m.maizuo.com/v4/api/film/${id}`, //仅为示例，并非真实的接口地址
      data: {
        __t:1532485092069
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: this.handleGetDetailDate.bind(this)
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    this.handleGetDetailDatefilm(options.id)
  },

  onReady: function () {
    
  },
  handleGetDetailDate(e){
    console.log(e.data.data.film)
    let list=e.data.data.film;
    var str=""
    list.premiereAt=time.formatTime(new Date(list.premiereAt))
    list.actors.map(item=>{
      console.log(item)
      str+= item.name+"|"
    })
    list.actors=str;
    this.setData({
      detail:list
    },()=>{
      console.log(this.data.detail)
    })
  }
  
})