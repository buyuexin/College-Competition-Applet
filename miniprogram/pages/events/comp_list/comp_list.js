// pages/comp_list/comp_list.js
let DB=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,  // 有两种形式，0或1，赛氪上的列表用0，自己创建的赛事列表用1
    title:"",
    end:3,//用于实现触底加载更多
    competitionList:[],//赛事列表
    compListname:""//某类赛事列表名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options.title)
    if(options.title==0){
      that.setData({
        compListname:"mathemodel",
        title:"数学建模"
      })
      DB.collection(that.data.compListname).get({
        success(res){
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      })
    }else if(options.title==1){
      that.setData({
        compListname:"programming",
        title:"程序设计"
      })
      DB.collection(that.data.compListname).get({
        success(res){
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      })
    }else if(options.title==2){
      that.setData({
        compListname:"sbusiness",
        title:"创业"
      })
      DB.collection(that.data.compListname).get({
        success(res){
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      })
    }else if(options.title==3){
      that.setData({
        compListname:"math",
        title:"数学"
      })
      DB.collection(that.data.compListname).get({
        success(res){
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      })
    }else if(options.title==4){
      that.setData({
        compListname:"_uidesign",
        title:"UI设计"
      })
      DB.collection(that.data.compListname).get({
        success(res){
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      })
    }else if(options.title==5){
      that.setData({
        compListname:"challenge",
        title:"挑战杯"
      })
      DB.collection(that.data.compListname).get({
        success(res){
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      })
    }
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
    var that=this
    this.data.end+=2
    DB.collection(that.data.compListname).get({
      success(res){
        if(that.data.end>res.data.length){
          wx.showToast({ title: '到底了哟~', })
        }else{
          that.setData({
            competitionList:res.data.slice(0,that.data.end)
          })
        }
      }
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})