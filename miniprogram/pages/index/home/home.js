let DB=wx.cloud.database()
Page({
  data: {
    title: null,
    nav: [
      {color:'#ad1010', title:'工科'},
      {color:'#1979d3', title:'理科'},
      {color:'#e9ad09', title:'商科'},
      {color:'#f71239', title:'文体'},
      {color:'#ff7f1c', title:'综合'}],
    //当前轮播图的id
    cardCur: 0,
    //轮播图数据
    swiperList:[],
    //热点资讯数据
    articleList:[
      {
        title: "【必考】大学最有含金量的9大类证书！ ",
        src: "http://cdn1.52jingsai.com/portal/201810/31/131938axfalcczicu5c9zu.jpg",
        outline: "拥有证书不仅说明你的学习能力很强，而且你还勤奋努力，而这才是企业所看重的，也是你未来的生存之道。其实有很多的同学很想知道，大学必考的类目和证书有哪些，哪些又是比较有价值的，为此小编整理了相关信息，希望会对大家有所帮助！",
        tag:["大学","考证"]
      },
    ],
    //用于触底加载更多
    end:2
  },
  onLoad(options) {
    var that=this
    // 初始化towerSwiper 传已有的数组名即可
    wx.cloud.callFunction({//获取用户openID
      name:"Gusermess",
      success(res){
        let bigopenid=res.result.event.userInfo.openId
        const openid=bigopenid;//将openid存入缓存
        wx.setStorageSync('openid',openid)
          wx.cloud.callFunction({//判断用户存在users中
            name:"IfopenID",
            data:{
              Iopenid:res.result.event.userInfo.openId//Iopenid为参数
            },
            success(res){
              if(res.result.data.length==0){//用户不存在
                wx.cloud.database().collection("users").add({
                  data:{
                    useropenid:bigopenid,
                    avatarUrl:"miniprogram\images\icon.png",
                    nickname:"小明",
                    name:"王小明",
                    gender:"男",
                    contact:"******@qq.com/139*****383",
                    school:"华南师范大学",
                    college:"软件学院",
                    major:"软件工程",
                    grade:"大一",
                  }
                })
                wx.showModal({//提示是否前往授权
                  openid:"提示",
                  content: "前往授权",
                  success: function(res){
                  if (res.confirm) {//点击确定，前往授权
                    wx.redirectTo({
                      url: '../../my/home/home',
                    })
                  } else if (res.cancel) {}
                  }
                })                 
              }else{}//用户存在无需作为
            }
          })
      }
    })
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

  onLaunch(){
    
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