//logs.js

Page({
    data:{
        type:"now-playing",
        nowPlaying:[],
        page:1
    },
    staticData:{
        flag:true
    },

    onLoad(){
        var res =wx.getSystemInfoSync()
        console.log(res.windowWidth)
        console.log(res.windowHeight)
    },
    //切换导航
    handleChangeType(){
        if(this.data.type === "now-playing"){
            this.setData({
                type:"coming-soon" 
            })
            return;
        }

        if(this.data.type === "coming-soon"){
            this.setData({
                type:"now-playing" 
            })
            return;
        }
    },
    onReady(){
        this.handleGetNowplaying();

    },
    handleGetNowplaying(){
         //https://m.maizuo.com/v4/api/film/now-playing?
         wx.request({
            url: 'https://m.maizuo.com/v4/api/film/now-playing', //仅为示例，并非真实的接口地址
            data: {
                "page":1,
                "count":7
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: this.handleGetNowplayingData.bind(this)
          })
    },
    handleGetNowplayingData(res){
        let data = res.data.data.films;
        if(data.length!==0){
            this.setData({
                nowPlaying:[...this.data.nowPlaying,...data],
                page:this.data.page+1
            })
            console.log(this.data.page)
        }
        
    },
    //上拉触底
    // onReachBottom(){
    //     console.log("11111")
    // }
    handleScrollBottom(){
      this.getNowplayingmoreData()
    },
    getNowplayingmoreData(){
       
        if(this.data.page<6 && this.staticData.flag){
            this.staticData.flag = false;
            setTimeout(this.handleRuquestData,500)
        }
    },
    handleRuquestData(){
        //https://m.maizuo.com/v4/api/film/now-playing?page=2&count=7
        wx.request({
            url: 'https://m.maizuo.com/v4/api/film/now-playing', //仅为示例，并非真实的接口地址
            data: {
                "page":this.data.page,
                "count":7
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: this.handleGetNowplayingData.bind(this)
        })
        this.staticData.flag = true;
    },
    handledetail(e){
        console.log(e)
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id='+id
        })
    }
})
