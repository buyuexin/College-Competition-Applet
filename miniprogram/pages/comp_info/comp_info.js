const app = getApp();
Page({
  data:{
    CustomBar: app.globalData.CustomBar,
    cur: 0, 
    teamList:[
      {
        icon:"../../images/icon.png",
        name:"李默",
        time:"4月11日 12:24",
        tag:["互联网+", "校赛", "华南师大"],
        teamName:"nb队",
        teamDisc:"xxx"
      },
      {
        icon:"../../images/icon.png",
        name:"李默",
        time:"4月11日 12:24",
        tag:["互联网+", "校赛", "华南师大"],
        teamName:"nb队",
        teamDisc:"xxx"
      },
      {
        icon:"../../images/icon.png",
        name:"李默",
        time:"4月11日 12:24",
        tag:["互联网+", "校赛", "华南师大"],
        teamName:"nb队",
        teamDisc:"xxx"
      },
      {
        icon:"../../images/icon.png",
        name:"李默",
        time:"4月11日 12:24",
        tag:["互联网+", "校赛", "华南师大"],
        teamName:"nb队",
        teamDisc:"xxx"
      },
      {
        icon:"../../images/icon.png",
        name:"李默",
        time:"4月11日 12:24",
        tag:["互联网+", "校赛", "华南师大"],
        teamName:"nb队",
        teamDisc:"xxx"
      },
    ],
    image:"",
    title:"", 
    host:"",  
    registrationTime:"",  
    startTime:"", 
    rank:"",  
    type:"",
    content:"",
  },

  click(e) {
    //console.log(parseInt(e.currentTarget.dataset.idx))
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
    // console.log(options)
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
})