// pages/team_rls/team_rls.js
const app = getApp();
var util = require('../../../utils/util.js');
var schoolcomp=""
var standard=1//用于判断是否所有输入框都有输入（照片除外）及判断时间设置逻辑是否真确
const image=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelList: app.globalData.levelList,
    collegeList: app.globalData.collegeList,
    typeList: app.globalData.typeList,
    content:"",
    contentCount:0,
    images:[],
    compname:"",
    sponsor:"",
    college:0,
    level:0,
    type:0,
    today:"",
    regStart:"",
    regEnd:"",
    compStart:"",
    compEnd:"",
    state:"",
    statecolor:"",
    isShow:true
    // level: 0,  // 赛事级别序号
    // college: 0,  // 发布学院序号
    // type: 0, // 赛事类型序号
    // contentCount: 0,
    // content: "",
    // regStart: '',  // 报名开始时间
    // regEnd: '',  // 报名结束时间
    // compStart: '',  // 比赛开始时间
    // compEnd: '',  // 比赛结束时间
    // images:[],  // 上传的图片数组
  },

  // 获取输入文本框的内容及字数
  getContentInput(e){
    const value = e.detail.value;
    this.data.content = value;
    var len = parseInt(value.length);
    this.setData({
      contentCount: len
    })
  },

  //获取赛事名称
  getcompname(e){
    this.setData({
      compname:e.detail.value
    })
  },

  //获取主办方
  getsponsor(e){
    this.setData({
      sponsor:e.detail.value
    })
  },

  // 选择图片
  chooseImage(e) {
    var that=this
    if(that.data.images.length >= 6) {
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
          // console.log(tempFilePaths)
          wx.cloud.uploadFile({
            cloudPath:new Date().getTime()+'.png',
            filePath:tempFilePaths[0],
            success:res=>{
              // console.log(res)
              that.data.images=that.data.images.concat(res.fileID)
              // console.log(that.data.images)
              that.setData({
                images: that.data.images.length <=6 ? that.data.images : that.data.images.slice(0, 6)
              })
            },
            fail:console.error
          })
          // const images = this.data.images.concat(tempFilePaths)
          // this.setData({
          //   images: images.length <=6 ? images : images.slice(0, 6)
          // })
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
    // console.log(e)
    this.setData({
      level: parseInt(e.detail.value) 
    })
  },

  // 发布学院选择
  collegeChange(e) {
    this.setData({
      college:parseInt(e.detail.value) 
    })
  },

  // 赛事类型选择
  typeChange(e) {
    this.setData({
      type: e.detail.value
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


  onLoad: function (options) {
    schoolcomp=wx.getStorageSync("schoolcomp")
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      today: date,
      regStart: date,
      regEnd: date,
      compStart: date,
      compEnd: date,
    });

  },
  //判断发布信息是否填写完整
  getstandard(){
    if(this.data.content==""||this.data.compname==""||this.data.sponsor==""){
      standard=0
    }else{
      standard=1  
    }
  },

  submitform(){
    var that=this
    that.getstandard()
    if(standard==1){      
    //判断当前时间和报名时间的相对位置，以此设置state和statecolor
    var timestamp = Date.parse(new Date());//获取当前时间戳
    var regStarttimestamp=new Date(this.data.regStart).getTime();//将报名开始时间转为时间戳
    var regEndtimestamp=new Date(this.data.regEnd).getTime()+86486399;//报名结束时间当天的23:59:59
    var compStarttimestamp=new Date(this.data.compStart).getTime();//将比赛开始时间转为时间戳
    var compEndtimestamp=new Date(this.data.compEnd).getTime()+86486399;//比赛结束时间当天的23:59:59
    if(regStarttimestamp<=timestamp&&timestamp<=regEndtimestamp){
      that.setData({
        state:"正在报名",
        statecolor:"green"
      })
    }else if(timestamp<=regStarttimestamp){
      that.setData({
        state:"即将报名",
        statecolor:"green"
      })
    }else if(compStarttimestamp<=timestamp&&timestamp<=compEndtimestamp){
      that.setData({
        state:"正在进行",
        statecolor:"yellow"
      })
    }else{
      that.setData({
        state:"报名结束",
        statecolor:"gray"
      })
    }
    if(schoolcomp!=0){
      wx.cloud.database().collection("school_comp").add({
        data:{
          schoolcomp:schoolcomp,
          content:that.data.content,
          contentCount:that.data.contentCount,
          images:that.data.images,
          compname:that.data.compname,
          sponsor:that.data.sponsor,
          college:that.data.college,
          level:that.data.level,
          type:that.data.type,
          regStart:that.data.regStart,
          regEnd:that.data.regEnd,
          compStart:that.data.compStart,
          compEnd:that.data.compEnd,
          state:that.data.state,
          statecolor:that.data.statecolor,
          isShow:that.data.isShow
        }
      })
    }else{
      wx.cloud.database().collection("school_comp").add({
        data:{
          content:that.data.content,
          contentCount:that.data.contentCount,
          images:that.data.images,
          compname:that.data.compname,
          sponsor:that.data.sponsor,
          college:that.data.college,
          level:that.data.level,
          type:that.data.type,
          regStart:that.data.regStart,
          regEnd:that.data.regEnd,
          compStart:that.data.compStart,
          compEnd:that.data.compEnd,
          state:that.data.state,
          statecolor:that.data.statecolor,
          isShow:that.data.isShow
        }
      })
    }
    
    wx.navigateBack({
      delta: 0,
    })
    }else{
      wx.showToast({
        title: '请将信息补充完整',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})