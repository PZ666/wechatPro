// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cinemaData:[],
     cinemaAddress:[]
  },
  handleGetCinema(){
     //https://m.maizuo.com/v4/api/cinema?__t=1532501721435
      wx.request({
        url: 'https://m.maizuo.com/v4/api/cinema', //仅为示例，并非真实的接口地址
        data: {
          __t:1532501721435
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: this.handleGetCinemaData.bind(this)
      })
},
  handleGetCinemaData(res){

    console.log(res.data.data.cinemas)
    let list = res.data.data.cinemas; 
    let arry=[];
    for(var i=0;i<list.length;i++){
      arry.push(list[i].district.name)
    }
    let newArry=Array.from(new Set(arry))
    let newData=[];
    for(let i=0;i<newArry.length;i++){
      newData[i] = { name: newArry[i], data: [], type: "false" };
    }
    for(let i=0;i<newData.length;i++){
      for(let j=0;j<list.length;j++){
        if(list[j].district.name==newData[i].name){
          newData[i].data.push(list[j])
        }
      }
    }
    this.setData({
        cinemaData:[...list],
        cinemaAddress:[...newData]            
    },()=>{
      console.log(this.data.cinemaData)
      console.log(this.data.cinemaAddress)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleGetCinema()
  },

  changeList(e) {
    console.log(e);
    for (let i = 0; i < this.data.cinemaAddress.length; i++) {
      if (e.target.dataset.type == this.data.cinemaAddress[i].name) {
        this.data.cinemaAddress[i].type = !this.data.cinemaAddress[i].type;
      }
    } 
    this.setData({
      cinemaAddress: this.data.cinemaAddress
    });
  }

})