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
    image:"../../images/comp_pic.png", // 插图
    title:"2021年第十一届MathorCup高校数学建模挑战赛", // 比赛名
    host:"中国优选法统筹法与经济数学研究会",  // 主办方
    registrationTime:"2021.01.01 00:00--2021.04.14 12:00",  // 报名时间
    startTime:"2021.04.15 08:00--2021.04.19 09:00",  // 比赛时间
    rank:"全国性",  // 级别
    type:"组队赛",  // 类型
    content:"",
  },

  click(e) {
    console.log(parseInt(e.currentTarget.dataset.idx))
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
    console.log(e.currentTarget.dataset.id);
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

  },
})