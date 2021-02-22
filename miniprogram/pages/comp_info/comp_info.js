const app = getApp();
let classvalue=0;
let idvalue=0;
Page({
  data:{
    CustomBar: app.globalData.CustomBar,
    islike: 0,
    cur: 0, 
    teamList:[]
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
    const classvalue=wx.getStorageSync("class");
    const idvalue=wx.getStorageSync("id");
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
      }
    })
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
    let like = 1-this.data.islike;
    this.setData({
      islike: like
    })
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
    wx.setStorageSync('class',classvalue)
    wx.setStorageSync('id',idvalue)
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
  },

  onShow:function(){
   this.upteamlist()
  }
})