const app = getApp();
Page({
  data:{
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    tabNav: ['比赛详情', '招募消息'],
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
    sponsor:"中国优选法统筹法与经济数学研究会",  // 主办方
    registrationTime:"2021.01.01 00:00--2021.04.14 12:00",  // 报名时间
    startTime:"2021.04.15 08:00--2021.04.19 09:00",  // 参赛时间
    rank:"全国性",  // 级别
    type:"组队赛",  // 类型
    content:"",
  },

  changeTab(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})