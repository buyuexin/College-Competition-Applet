// pages/my/myrls/myrls.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
    teamList: [
      {
       time: "2021-02-19 15:15", // 发布时间
       name: "nb队", // 队伍名称
       comp: "MathorCup数学建模大赛",
       tag: ["挑战杯", "校级"], // 标签
      },
      {
       time: "2021-02-19 15:15", // 发布时间
       name: "nb队", // 队伍名称
       comp: "MathorCup数学建模大赛",
       tag: ["挑战杯", "校级"], // 标签
      },
      {
       time: "2021-02-19 15:15", // 发布时间
       name: "nb队", // 队伍名称
       comp: "MathorCup数学建模大赛",
       tag: ["挑战杯", "校级"], // 标签
      },
    ],
    compList: [
      {
        name: "2021年第十一届MathorCup高校数学建模挑战赛",  // 比赛名称
        host: "中国优选法统筹法与经济数学研究会",  // 主办方
      },
      {
        name: "2021年第十一届MathorCup高校数学建模挑战赛",
        host: "中国优选法统筹法与经济数学研究会",
      },
    ],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var Client = wx.getMenuButtonBoundingClientRect();
        var height = res.windowHeight - (res.statusBarHeight + Client.height + (Client.top - res.statusBarHeight) * 2)
        that.setData({
          clientHeight: res.windowHeight,
          height_sys: height - 64,
        });
      }
    });

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