// pages/comp_list/comp_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,  // 有两种形式，0或1，赛氪上的列表用0，自己创建的赛事列表用1
    title:"程序设计",
    competitionList:[
      {
        url: "",
        image:"../../images/comp_pic.png",
        name:"2021年第十一届MathorCup高校数学建模挑战赛hhhhhhhh",
        date:"2020-3-5",
        level:"国家级",
        registrationTime:"2021.01.01-2021.04.14",  // 报名时间
        startTime:"2021.04.15-2021.04.19",  // 参赛时间
        statecolor:"green",  // gray/green/yellow
        state:"正在报名"  // 已结束/正在报名/正在进行
      },
      {
        url: "",
        image:"../../images/comp_pic.png",
        name:"MathorCup高校数学建模挑战赛",
        level:"校级",
        registrationTime:"2021.01.01-2021.04.14",  // 报名时间
        startTime:"2021.04.15-2021.04.19",  // 参赛时间
        statecolor:"gray",  
        state:"已结束"  
      },
      {
        url: "",
        image:"../../images/comp_pic.png",
        name:"2021年第十一届MathorCup高校数学建模挑战赛",
        level:"院级",
        registrationTime:"2021.01.01-2021.04.14",  // 报名时间
        startTime:"2021.04.15-2021.04.19",  // 参赛时间
        statecolor:"yellow",  
        state:"正在进行"  
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})