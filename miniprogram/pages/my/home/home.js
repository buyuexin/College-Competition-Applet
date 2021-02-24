// pages/me/me.js
let openid
let type=0//用于记录用户是否已经授权，已授权则禁用授权键的功能。0为未授权
let hover="button-hover"
Page({
  data: {
    pageTopHeight: wx.getSystemInfoSync().statusBarHeight+30+7,
    useravatar:"../../../images/icon.png",
    username:"点击授权登录",
  },
  onLoad: function (options) {
    var that=this
    wx.getSetting({//检测用户是否已经授权
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已授权过    
          wx.getUserInfo({
            success(res) {
              that.setData({//设置头像和昵称
                useravatar:res.userInfo.avatarUrl,
                username:res.userInfo.nickName,
                type:1,
                hover:"none"
              })
              //更新数据库内用户头像及昵称数据
              openid=wx.getStorageSync("openid");//获取缓存内的用户openID
              wx.cloud.database().collection("users").where({useropenid:openid}).update({
                data:{
                  avatarUrl:that.data.useravatar,
                  nickname:that.data.username
                }
              })
            }
          })
        }else{}//未授权
      }
    })
  },
  //点击授权获取用户信息
  getuserinfo(e){
    if(this.data.type==0){
      var that=this
    that.setData({//设置头像和昵称
      useravatar:e.detail.userInfo.avatarUrl,
      username:e.detail.userInfo.nickName,
      type:1,
      hover:"none"
    })
    //更新数据库内用户头像及昵称数据
    openid=wx.getStorageSync("openid");//获取缓存内的用户openID
    wx.cloud.database().collection("users").where({useropenid:openid}).update({
      data:{
        avatarUrl:that.data.useravatar,
        nickname:that.data.username
      }
    })
    //提示是否立刻完善个人信息
    wx.showModal({
      title: "提示",
      content: "请完善个人信息",
      success: function(res){
      if (res.confirm) {//确定前往完善个人信息
        wx.navigateTo({
          url: '../myinfo/myinfo',
        })
      }else if (res.cancel){}
      }
    })
    }
  },
  // tab页面跳转
  pageChange(e){
    var page_name = e.currentTarget.dataset.cur;
    // console.log(page_name);
    if(page_name != "my") 
    {
      wx.redirectTo({
        url: '../../'+page_name+'/home/home',
      })
    }
  },
})