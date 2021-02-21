const app = getApp();
Page({
  data:{
    CustomBar: app.globalData.CustomBar,
    islike: 0,
    cur: 0, 
    teamList:[],
    image:"",
    title:"", 
    host:"",  
    registrationTime:"",  
    startTime:"", 
    rank:"",  
    type:"",
    content:"",
  },

  clickrls(e) {
    this.setData({
      cur: parseInt(e.currentTarget.dataset.idx),
    })
    this.upteamlist()
  },

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
        var newteamList=res.result.data.concat(app.globalData.teamlist)
        that.setData({
          teamList:newteamList,
        })
      }
    })
  },

  clickinfo(e){
    this.setData({
         cur: parseInt(e.currentTarget.dataset.idx),
       })
  },

  bindChange: function(e) {
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
    //console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  onLoad: function (options) {
    var that = this;
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
    //获取比赛具体信息
    wx.cloud.callFunction({
      name:"Getcompinfo",
      data:{
        class:options.class,
        id:options.id
      },
      success(res){
        var comp=res.result.data[0]
        // console.log(res.result.data[0])获取到具体比赛相关信息
        that.setData({
          image:comp.image, 
          title:comp.name, 
          host:comp.sponsor,  
          registrationTime:comp.registrationTime, 
          startTime:comp.startTime,  
          rank:comp.level, 
          type:comp.type, 
          content:"了解详情:"+comp.link,
        })
        const classvalue=comp.class;
        const idvalue=comp.id;
        wx.setStorageSync('class',classvalue)
        wx.setStorageSync('id',idvalue)
      }
    })
  },

  onShow:function(){
   this.upteamlist()
  }
})