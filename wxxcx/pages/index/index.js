//index.js
//获取应用实例
const util=require("../../utils/util")

Page({
    data:{
        imgUrls:[],
        nowPlaying:[],
        comingSoon:[]
    },
    onReady(){
        //https://m.maizuo.com/v4/api/billboard/home?
        this.getBannerUrl();
        this.getNowPlayingData()
        this.getcomingSoonData()

    },
    //获取轮播
    getBannerUrl(){
        wx.request({
            
            url: 'https://m.maizuo.com/v4/api/billboard/home', //仅为示例，并非真实的接口地址
            data: {
                "__t":1532432488909
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: this.handleGetBannerSucc.bind(this)
          })
    },
    handleGetBannerSucc(res){
       console.log( res);
        
        let data = res.data.data.billboards;
        let urls = []
        for(var i=0;i<data.length;i++){
            urls.push(data[i].imageUrl);
        }
        this.setData({
            imgUrls:[...urls]
        })
    },
    getNowPlayingData(){
        //https://m.maizuo.com/v4/api/film/now-playing?
        wx.request({
            url: 'https://m.maizuo.com/v4/api/film/now-playing', //仅为示例，并非真实的接口地址
            data: {
                "__t":1532398799123,
                "page":1,
                "count":5
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: this.handleGetnowPlaying.bind(this)
          })
    },
    handleGetnowPlaying(res){
        let data = res.data.data.films;
        this.setData({
            nowPlaying:[...this.data.nowPlaying,...data] 
        })
    },
    //获取即将上映的电影
    getcomingSoonData(){
        //https://m.maizuo.com/v4/api/film/coming-soon?__t=1532398799127&page=1&count=3
        wx.request({
            url: 'https://m.maizuo.com/v4/api/film/coming-soon', //仅为示例，并非真实的接口地址
            data: {
                "__t":1532398799127,
                "page":1,
                "count":3
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: this.handleGetcomingSoon.bind(this)
          })
    },
    handleGetcomingSoon(res){
        let data = res.data.data.films;
        data.map(item=>{
            item.premiereAt =util.formatTime(new Date(item.premiereAt))
        })
        this.setData({
            comingSoon:[...this.data.comingSoon,...data] 
        })
    },
    handledetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id='+id
        })
    }
   
})
