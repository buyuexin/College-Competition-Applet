// pages/team_rls/team_rls.js
const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelList: app.globalData.levelList,
    collegeList: app.globalData.collegeList,
    level: 0,  // 赛事级别序号
    college: 0,  // 发布学院序号
    contentCount: 0,
    content: "",
    regStart: '',  // 报名开始时间
    regEnd: '',  // 报名结束时间
    compStart: '',  // 比赛开始时间
    compEnd: '',  // 比赛结束时间
    images:[],  // 上传的图片数组
  },

  // 获取输入文本框的字数
  getContentInput(e){
    const value = e.detail.value;
    this.data.content = value;
    var len = parseInt(value.length);
    this.setData({
      contentCount: len
    })
  },


  // 选择图片
  chooseImage(e) {
    if(this.data.images.length >= 6) {
      wx.showToast({
        title: '上传图片数量已达上限！',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可选择原图或压缩
        sourceType: ['album','camera'], // 开放相册/相机
        success: res => {
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          const images = this.data.images.concat(tempFilePaths)
          this.setData({
            images: images.length <=6 ? images : images.slice(0, 6)
          })
        }
      })
    }
  },

  // 预览图片
  previewImage(e){
    const idx = e.target.dataset.idx;
    const images = this.data.images;
    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  // 长按删除图片
  deleteImage: function (e) {//删除图片
    var that = this;
    var images = that.data.images;
    const index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定');
          images.splice(index, 1);//通过splice方法删除当前元素
          that.setData({
            images: images,
          });
        } 
        else if (res.cancel) {
          console.log('点击取消');
          return false;
        }
      }
    })
  },

  // 赛事级别选择
  levelChange(e) {
    this.setData({
      level: e.detail.value
    })
  },

  // 发布学院选择
  collegeChange(e) {
    this.setData({
      college: e.detail.value
    })
  },

  // 时间选择
  DateChange(e) {
    console.log(e);
    let type = e.currentTarget.dataset.time;
    let time = e.detail.value;
    if(type == 'regStart') {
      this.setData({
        regStart: time
      })
    } else if(type == 'regEnd') {
      this.setData({
        regEnd: time
      })
    } else if(type == 'compStart') {
      this.setData({
        compStart: time
      })
    } else {
      this.setData({
        compEnd: time
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      regStart: date,
      regEnd: date,
      compStart: date,
      compEnd: date,
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