// pages/comp_list/comp_list.js
let DB=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,  // 有两种形式，0或1，赛氪上的列表用0，自己创建的赛事列表用1
    title:"",
    end:10,//用于实现触底加载更多
    competitionList:[],//赛事列表
    compListnum:0//某类赛事列表名代号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if(options.title==0){
      wx.cloud.callFunction({
        name:"Bcomplist",
        data:{
          a:options.title
        },
        success(res){
          that.setData({
            compListnum:0,
            competitionList:res.result.data.slice(0,that.data.end),
            title:"工科"
          })
        }
      })
    }else if(options.title==1){
      wx.cloud.callFunction({
        name:"Bcomplist",
        data:{
          a:options.title
        },
        success(res){
          that.setData({
            compListnum:1,
            competitionList:res.result.data.slice(0,that.data.end),
            title:"理科"
          })
        }
      })
    }else if(options.title==2){
      wx.cloud.callFunction({
        name:"Bcomplist",
        data:{
          a:options.title
        },
        success(res){
          that.setData({
            compListnum:2,
            competitionList:res.result.data.slice(0,that.data.end),
            title:"商科"
          })
        }
      })
    }else if(options.title==3){
      wx.cloud.callFunction({
        name:"Bcomplist",
        data:{
          a:options.title
        },
        success(res){
          that.setData({
            compListnum:3,
            competitionList:res.result.data.slice(0,that.data.end),
            title:"文体"
          })
        }
      })
    }else if(options.title==4){
      wx.cloud.callFunction({
        name:"Bcomplist",
        data:{
          a:options.title
        },
        success(res){
          that.setData({
            compListnum:4,
            competitionList:res.result.data.slice(0,that.data.end),
            title:"综合"
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
    this.data.end+=10
    wx.cloud.callFunction({
      name:"Bcomplist",
      data:{
        a:that.data.compListnum
      },
      success(res){
        if(that.data.end>res.result.data.length){
          wx.showToast({ title: '到底了哟~', })
        }else{
          that.setData({
            competitionList:res.result.data.slice(0,that.data.end),
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