// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderList:["男","女"],
    gradeList:["大一","大二","大三","大四","研一","研二","研三"],
    info:[
      "../../../images/icon.png",  // 头像url
      "Nicole",  // 昵称
      "王老二",  // 姓名
      0,  // 性别 genderList的序号
      "华南师范大学",  // 学校 
      "软件学院",  // 院系
      "软件工程",  // 专业
      1  // 年级 gradeList的序号
    ],
    disabled: true,  // 保存按钮是否禁用，有修改才启用
  },

  // input框内容修改
  inputChange(e) {
    console.log(e);
    let type = parseInt(e.currentTarget.dataset.type);
    if(e.detail.value != this.data.info[type]) {
      this.setData({
        disabled: false
      })
    }
  },

  pickerChange(e) {
    let type = parseInt(e.currentTarget.dataset.type);
    if(e.detail.value != this.data.info[type]) {
      let key = "info["+type+"]";
      let param = {};
      param[key] = e.detail.value;
      param['disabled'] = false;
      this.setData(param);
    }

  } ,

  // 性别选择
  genderChange(e) {
    // console.log(e);
    let g = this.data.gender;
    if(g != e.detail.value) {
      this.setData({
        disabled: false,
        gender: e.detail.value
      })
    }
  },
  
  // 年级选择
  gradeChange(e) {
    // console.log(e);
    let g = this.data.grade;
    if(g != e.detail.value) {
      this.setData({
        disabled: false,
        grade: e.detail.value
      })
    }
  },

  // 表单提交
  formSubmit(e) {
    console.log(e.detail)
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