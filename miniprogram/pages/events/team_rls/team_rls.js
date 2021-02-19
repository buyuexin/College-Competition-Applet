// pages/team_rls/team_rls.js

var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowModel: null,  // 是否弹出标签输入框
    inputValue: "",  // 标签输入框的值
    contentCount: 0,
    content: "",
    date: '',
    college: '',  // 所在学校及院系(可以是该用户填的university+college)
    contact: '',  // 联系方式
    tags: [], // 标签列表
    images:[],  // 上传的图片列表
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

  addTag(e) {
    this.setData({
      modalName: 'DialogModal2',
    })
  },

  hideModal(e) {
    this.setData({
      inputValue: "",
      modalName: null
    })
  },

  formSubmit(e) {
    let that = this;
    let tags = that.data.tags;
    let tag = e.detail.value.tag;
    if(tags.length>=5) {
      wx.showToast({
        title: '最多只能添加5个标签！',
        icon: 'none',
      })
      that.hideModal();
    } else if(tag.length>=7) {
      wx.showToast({
        title: '最多只能输入7个字符！',
        icon: 'none',
      })
    } else if(tag.length==0) {
      wx.showToast({
        title: '标签不能为空！',
        icon: 'none',
      })
    } else {
      tags.push(tag);
      that.setData({
        tags: tags,
      })
      that.hideModal();
    }
  },

  deletetag(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该标签吗？',
      success (res) {
        if (res.confirm) {
          let idx = e.currentTarget.dataset.idx;
          let tags = that.data.tags;
          if(idx>=0) {
            tags.splice(idx,1);
            that.setData({
              tags: tags
            })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      date: date
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