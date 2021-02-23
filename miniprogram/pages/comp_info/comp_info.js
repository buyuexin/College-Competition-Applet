const app = getApp();
let classvalue=0;
let idvalue=0;
let schoolcomp=""//用于唯一标识某个校内赛事
let openid=""
let otherimages=[]
Page({
  data:{
    CustomBar: app.globalData.CustomBar,
    islike: 0,
    cur: 0, 
    teamList:[],
    complist:[],
    otherimage:[]
  },
  //点击“招募消息”
  clickrls(e) {
    this.setData({
      cur: parseInt(e.currentTarget.dataset.idx),
    })
    this.upteamlist()
  },
  //更新“招募消息”列表
  upteamlist(){
    var that=this
    //  classvalue=wx.getStorageSync("class");
    //  idvalue=wx.getStorageSync("id");
    if(schoolcomp!=0){
      wx.cloud.callFunction({
        name:"Gteamlist",
        data:{
          type:2,
          schoolcomp:schoolcomp
        },
        success(res){
          var changeteamList=res.result.data.concat(app.globalData.teamlist).reverse()
          if(changeteamList.length>1){changeteamList.splice(0,1)}
          that.setData({
            teamList:changeteamList,
          })
          // console.log(that.data.teamList)
        }
      })
    }else{
      wx.cloud.callFunction({
        name:"Gteamlist",
        data:{
          type:0,
          class:classvalue,
          id:idvalue
        },
        success(res){
          var changeteamList=res.result.data.concat(app.globalData.teamlist).reverse()
          if(changeteamList.length>1){changeteamList.splice(0,1)}
          that.setData({
            teamList:changeteamList,
          })
          // console.log(that.data.teamList)
        }
      })
    }
    
  },
  //点击“比赛详情”
  clickinfo(e){
    this.setData({
         cur: parseInt(e.currentTarget.dataset.idx),
       })
  },

  bindChange: function(e) {
    console.log(e.detail.current)
    this.setData({
      cur: e.detail.current
    });
  },

  toTeamrls(e) {
    wx.navigateTo({
      url: '../events/team_rls/team_rls',
    })
  },

  // 收藏
  collect: function(e) {
    var that=this
    let like = 1-that.data.islike;
    that.setData({
      islike: like
    })
    // console.log(classvalue)
    // console.log(idvalue)
    //将收藏比赛进行收藏
    if(that.data.islike==1)
    {
      if(schoolcomp!=0){
        wx.cloud.database().collection("followcomp").add({
          data:{
            schoolcomp:schoolcomp,
            compname:that.data.complist.compname,
            regStart:that.data.complist.regStart,
            compStart:that.data.complist.compStart,
            regEnd:that.data.complist.regEnd,
            compEnd:that.data.complist.compEnd,
            state:that.data.complist.state,
            statecolor:that.data.complist.statecolor,
            image:that.data.complist.images[0]
          }
        })
      }else{
          wx.cloud.database().collection("followcomp").add({
            data:{
              class:classvalue,
              id:idvalue,
              compname:that.data.complist.name,
              registrationTime:that.data.complist.registrationTime,
              startTime:that.data.complist.startTime,
              state:that.data.complist.state,
              statecolor:that.data.complist.statecolor,
              image:that.data.complist.image
            }
          })
      }
    }else{
      if(schoolcomp!=0){
        wx.cloud.database().collection("followcomp").where({
          schoolcomp:schoolcomp,
          _openid:openid
        }).remove()
      }else{
        wx.cloud.database().collection("followcomp").where({
          class:classvalue,
          id:idvalue,
          _openid:openid
        }).remove()
      }
    }
    //将收藏键状态改变进行记录
    if(schoolcomp!=0){
      wx.cloud.database().collection("userlike").where({
        _openid:openid,
        id:schoolcomp
      }).update({
        data:{
          islike:that.data.islike
        }
      })
    }else{
      wx.cloud.database().collection("userlike").where({
        _openid:openid,
        class:classvalue,
        id:idvalue
      }).update({
        data:{
          islike:that.data.islike
        }
      })
    }
    
  },

  changeTab(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  onLoad: function (options) {
    var that = this;
    classvalue=options.class
    idvalue=options.id
    schoolcomp=options.schoolcomp
    wx.setStorageSync('class',classvalue)
    wx.setStorageSync('id',idvalue)
    wx.setStorageSync('schoolcomp',schoolcomp)
    wx.getSystemInfo({
      success: function(res) {
        var Client = wx.getMenuButtonBoundingClientRect();
        var height = res.windowHeight - (res.statusBarHeight + Client.height + (Client.top - res.statusBarHeight) * 2)
        that.setData({
          clientHeight: res.windowHeight,
          height_sys: height - 58,
        });
      }
    });
    that.getcompinfo()
  },
  //获取比赛具体信息
  getcompinfo(){
    var that=this
    if(schoolcomp!=0){//schoolcomp如果是从外部赛事点击进来的话结果为0，否则其初始值为null（在onLoad内体现）
      wx.cloud.callFunction({
        name:"Getcompinfo",
        data:{
          id:schoolcomp
        },
        success(res){
          // console.log(res)
          var comp=res.result.data[0]
          if(comp.type==0){comp.type="个人赛"}else{comp.type="团体赛"}
          if(comp.level==0){comp.level="院级"}else if(comp.level==1){comp.level="校级"}else if(comp.level==2){comp.level="市级"}else if(comp.level==3){comp.level="省级"}else if(comp.level==4){comp.level="国家级"}else if(comp.level==5){comp.level="国际级"}
          that.setData({
            complist:res.result.data[0]
          })
        }
      })
    }else{
      wx.cloud.callFunction({
        name:"Getcompinfo",
        data:{
          class:classvalue,
          id:idvalue
        },
        success(res){
          that.setData({
            complist:res.result.data[0]
          })   
        }
      })
    }
    
    
  },
  //获取收藏信息
  getuserlike(){
    var that=this
    if(schoolcomp!=0){
      wx.cloud.callFunction({
        name:"Bcomplist",
        data:{
          like:2,
          schoolcomp:schoolcomp
        },
        success(res){
          if(res.result.data.length==0){
            wx.cloud.database().collection("userlike").add({
              data:{
                id:schoolcomp,
                islike:0
              }
            })
            that.setData({
              islike:0
            })
          }else{
            that.setData({
              islike:res.result.data[0].islike
            })
          }
        }
      })
    }else{
      openid=wx.getStorageSync("openid");
    wx.cloud.callFunction({
      name:"Bcomplist",
      data:{
        like:1,
        openid:openid,
        class:classvalue,
        id:idvalue
      },
      success(res){
        if(res.result.data.length==0){
          wx.cloud.database().collection("userlike").add({
            data:{
              class:classvalue,
              id:idvalue,
              islike:0
            }
          })
        }else{
          that.setData({
            islike:res.result.data[0].islike
          })
        }
      }
    })
    }
    
  },

  onShow:function(){
   this.upteamlist()
   this.getuserlike()
  }
})