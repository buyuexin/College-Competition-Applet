// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderList:["男","女"],
    gradeList:["大一","大二","大三","大四","研一","研二","研三"],
    useropenid:"",
    avatarUrl:"",
    nickname:"",
    name:"请输入",
    gender:"男",
    contact:"请输入",
    school:"请输入",
    college:"请输入",
    major:"请输入",
    grade:"大一",
    disabled: true  // 保存按钮是否禁用，有修改才启用
  },

  //当用户点击input组件修改数据后激活按钮。欠缺：如果用户点击后不修改数据呢？
  actbutton(e){
    this.setData({
      disabled:false
    })
  },
  
  //当用户使用picker组件后，获取选中的值(性别)
  getchange(e){
    if(e.detail.value==0){
      this.setData({
        gender:"男"
      })
    }else{
      this.setData({
        gender:"女"
      })
    }
  },

    //当用户使用picker组件后，获取选中的值(年级)
    getchange2(e){
      if(e.detail.value==0){
        this.setData({
          grade:"大一"
        })
      }else if(e.detail.value==1){
        this.setData({
          grade:"大二"
        })
      }else if(e.detail.value==2){
        this.setData({
          grade:"大三"
        })
      }else if(e.detail.value==3){
        this.setData({
          grade:"大四"
        })
      }else if(e.detail.value==4){
        this.setData({
          grade:"研一"
        })
      }else if(e.detail.value==5){
        this.setData({
          grade:"研二"
        })
      }else if(e.detail.value==6){
        this.setData({
          grade:"研三"
        })
      }
    },

  //获取姓名
  getname(e){
    this.setData({
      name:e.detail.value
    })
  },

  //获取手机号/邮箱
  getcontact(e){
    this.setData({
      contact:e.detail.value
    })
  },

  //获取学校
  getschool(e){
    this.setData({
      school:e.detail.value
    })
  },

  //获取院系
  getcollege(e){
    this.setData({
      college:e.detail.value
    })
  },

  //获取专业
  getmajor(e){
    this.setData({
      major:e.detail.value
    })
  },

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
  submitform() {
    var that=this
    const stropenid=wx.getStorageSync("openid")
    wx.cloud.database().collection("users").where({openid:stropenid}).update({
      data:{
        useropenid:stropenid,
        avatarUrl:that.data.avatarUrl,
        nickname:that.data.nickname,
        name:that.data.name,
        gender:that.data.gender,
        contact:that.data.contact,
        school:that.data.school,
        college:that.data.college,
        major:that.data.major,
        grade:that.data.grade,
      }
    })
    that.setData({//每次提交后将按钮置灰
      disabled:true
    })
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
    var that=this;
    const openid=wx.getStorageSync("openid");
    let user=Promise.resolve(wx.cloud.database().collection("users").where({useropenid:openid}).get())
    user.then(res=>{
    that.setData({
      avatarUrl:res.data[0].avatarUrl,
      nickname:res.data[0].nickname,
      name:res.data[0].name,
      gender:res.data[0].gender,
      contact:res.data[0].contact,
      school:res.data[0].school,
      college:res.data[0].college,
      major:res.data[0].major,
      grade:res.data[0].grade,
    })
  })
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