// pages/me/me.js
let hover="button-hover"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:wx.getStorageSync('openid'),
    pageTopHeight: wx.getSystemInfoSync().statusBarHeight+30+7,
    useravatar:"../../../images/icon.png",
    type:0,//用于记录用户是否已经授权，已授权则禁用授权键的功能。0为未授权
    username:"点击授权",
    use:true
  },

  getUserProfile(e) {
    var that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log(that.data.use)
    if(that.data.use){
      wx.getUserProfile({
        desc: '获取头像及昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          that.setData({
            useravatar:res.userInfo.avatarUrl,
            username:res.userInfo.nickName,
          })
          wx.setStorageSync('useravatarurl', res.userInfo.avatarUrl)
          wx.setStorageSync('username', res.userInfo.nickName)
          wx.setStorageSync('NeedUseGetuserprofile', 0)
          wx.setStorageSync('use', false)
          wx.cloud.database().collection("users").add({
            data:{
              useropenid:that.data.openid,
              avatarUrl:that.data.useravatar,
              nickname:that.data.username,
              name:"",
              gender:"请选择",
              phonenum:"",
              email:"",
              school:"",
              college:"",
              major:"",
              grade:"",
            }
          })
          this.setData({
            hover:"none",
          })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var NeedUseGetuserproifle = wx.getStorageSync('NeedUseGetuserprofile')
    that.data.use=wx.getStorageSync('use')
    if(NeedUseGetuserproifle==0){
      that.setData({
        useravatar:wx.getStorageSync('useravatarurl'),
        username:wx.getStorageSync('username'),
        hover:"none",
      })
    }else{
      
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})