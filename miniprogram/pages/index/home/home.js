let DB=wx.cloud.database()
Page({
  data: {
    title: null,
    //当前轮播图的id
    cardCur: 0,
    //轮播图数据
    swiperList:[],
    //热点资讯数据
    articleList:[],
    //用于触底加载更多
    end:2
  },
  onLoad(options) {
    // 初始化towerSwiper 传已有的数组名即可
    //初始化swiperList
    var that=this
    DB.collection("swiperList").get({
      success(res){
        that.setData({//此处用setData让数据从逻辑层传到渲染层，实现动态渲染
          swiperList:res.data
        })
      }
    })
    //初始化articleList
    DB.collection("articleList").get({
      success(res){
        that.setData({//此处用setData让数据从逻辑层传到渲染层，实现动态渲染
          articleList:res.data.slice(0,that.data.end)
        })
      }
    })
  },

  // cardSwiper
  cardSwiper(e) {
    // 更新当前item的id
    this.setData({
      cardCur: e.detail.current,
    })
  },

  // tab页面跳转
  pageChange(e){
    var page_name = e.currentTarget.dataset.cur;
    // console.log(page_name);
    if(page_name != "index") 
    {
      wx.redirectTo({
        url: '../../'+page_name+'/home/home',
      })
    }
  },

  //触底加载更多
  onReachBottom(){
    var that=this
    that.data.end=that.data.end+3//具体加载多少待定
    DB.collection("articleList").get({
      success(res){
        if(that.data.end>res.data.length){//何时到底待数据量确定后来完善
          wx.showToast({ title: '到底了哟~', })
        }else{
          that.setData({
            articleList:res.data.slice(0,that.data.end)
          })
        }
        
      }
    })
  }
})