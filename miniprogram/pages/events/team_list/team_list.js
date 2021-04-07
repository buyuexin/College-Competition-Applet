// pages/team_list/team_list.js
Page({
  data: {
    teamList:[],
  },


  onLoad: function (options) {
    var that=this
    const classvalue=wx.getStorageSync("class");
    const idvalue=wx.getStorageSync("id");
    wx.cloud.callFunction({
      name:"Gteamlist",
      data:{
        class:classvalue,
        id:idvalue,
        type:0
      },
      success(res){
        that.setData({
          teamList:res.result.data
        })
      }
    })
  },
})