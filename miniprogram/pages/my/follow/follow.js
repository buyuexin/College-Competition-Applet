// pages/my/follow/follow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // competitionList:[
    //   {
    //     url: "",
    //     image:"../../../images/comp_pic.png",
    //     name:"2021年第十一届MathorCup高校数学建模挑战赛",
    //     level:"国家级",
    //     college:"软件学院",
    //     registrationTime:"2021.01.01-2021.04.14",  // 报名时间
    //     startTime:"2021.04.15-2021.04.19",  // 参赛时间
    //     statecolor:"green",  // gray/green/yellow
    //     state:"正在报名",  // 已结束/正在报名/正在进行
    //     isShow: true,
    //   },
    //   {
    //     url: "",
    //     image:"../../../images/comp_pic.png",
    //     name:"2020-2021年度第二届全国大学生算法设计与编程挑战赛（冬季赛）",
    //     level:"校级",
    //     college:"国际商学院",
    //     registrationTime:"2021.01.01-2021.04.14",  // 报名时间
    //     startTime:"2021.04.15-2021.04.19",  // 参赛时间
    //     statecolor:"gray",  
    //     state:"已结束",
    //     isShow: true, 
    //   },
    //   {
    //     url: "",
    //     image:"../../../images/comp_pic.png",
    //     name:"2021年“远见者杯”全国大学生创新促进就业（简历设计）大赛",
    //     level:"院级",
    //     college:"城市文化学院",
    //     registrationTime:"2021.01.01-2021.04.14",  // 报名时间
    //     startTime:"2021.04.15-2021.04.19",  // 参赛时间
    //     statecolor:"yellow",  
    //     state:"正在进行",  
    //     isShow: true,
    //   },
    // ],
    competitionList:[],
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    console.log(e.currentTarget.dataset.target)
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  // 删除
  delete(e) {
    let list = this.data.competitionList;
    let idx = e.currentTarget.dataset.idx;
    if(idx>=0) {
      list.splice(idx,1);
    }
    this.setData({
      competitionList: list
    })
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