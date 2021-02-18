const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    levelList: app.globalData.levelList,
    collegeList: app.globalData.collegeList,
    screenShow:"none",  // 筛选框显示
    competitionList:[
      {
        url: "",
        image:"../../../images/comp_pic.png",
        name:"2021年第十一届MathorCup高校数学建模挑战赛",
        level:"国家级",
        college:"软件学院",
        registrationTime:"2021.01.01-2021.04.14",  // 报名时间
        startTime:"2021.04.15-2021.04.19",  // 参赛时间
        statecolor:"green",  // gray/green/yellow
        state:"正在报名",  // 已结束/正在报名/正在进行
        isShow: true,
      },
      {
        url: "",
        image:"../../../images/comp_pic.png",
        name:"2020-2021年度第二届全国大学生算法设计与编程挑战赛（冬季赛）",
        level:"校级",
        college:"国际商学院",
        registrationTime:"2021.01.01-2021.04.14",  // 报名时间
        startTime:"2021.04.15-2021.04.19",  // 参赛时间
        statecolor:"gray",  
        state:"已结束",
        isShow: true, 
      },
      {
        url: "",
        image:"../../../images/comp_pic.png",
        name:"2021年“远见者杯”全国大学生创新促进就业（简历设计）大赛",
        level:"院级",
        college:"城市文化学院",
        registrationTime:"2021.01.01-2021.04.14",  // 报名时间
        startTime:"2021.04.15-2021.04.19",  // 参赛时间
        statecolor:"yellow",  
        state:"正在进行",  
        isShow: true,
      },
    ],
    keyword:[],  // 选中的关键词
  },

  // 搜索
  searchItem(e) {
    let key = e.detail.value.toLowerCase();
    let list = this.data.competitionList;
    for (let i = 0; i < list.length; i++) {
      let a = key;
      let b = list[i].name.toLowerCase();
      if (b.search(a) != -1) {
        list[i].isShow = true
      } else {
        list[i].isShow = false
      }
    }
    this.setData({
      competitionList: list
    })
  },

  // 筛选列表替换
  screenChange(e) {
    var cur = e.currentTarget.dataset.cur;
    var screenShow = this.data.screenShow;
    if(screenShow != cur) {
      screenShow = cur;
    } else {
      screenShow = "none";
    }
    this.setData({
      screenShow: screenShow,
    })
  },

  // 点击筛选中的item
  screenClick(e) {
    let listname = e.currentTarget.dataset.type;
    let list;
    if(listname == "levelList") {
      list = this.data.levelList;
    } else {
      list = this.data.collegeList;
    }
    let index = e.currentTarget.dataset.idx;
    let status = list[index].status;
    let name = list[index].name;
    let word = this.data.keyword;
    if(status == 'line-gray') {
      status = 'line-orange';
      word.push(name);
    } else {
      status = 'line-gray';
      let i = word.indexOf(name);
      if(i>-1) {
        word.splice(i, 1);
      }
    }
    var key = listname+"["+index+"].status";
    var param={};
    param[key]=status;
    this.setData(param);
    this.setData({
      keyword: word,
    })
  },

  // 确定
  confirm(e) {
    let word = this.data.keyword;
    let list = this.data.competitionList;

    if(word.length != 0) {
      for(let i = 0; i < list.length; i++) {
        let a = list[i].level;
        let b = list[i].college;
        console.log('a = ',a,', b = ',b);
        if(word.indexOf(a)!=-1 || word.indexOf(b)!=-1) {
          list[i].isShow = true;
        } else {
          list[i].isShow = false;
        }
      }
      this.setData({
        competitionList: list
      })
    }
    this.setData({
      screenShow: 'none',
    })
  },

  // 重置
  reset(e) {
    let levelList = this.data.levelList;
    let collegeList = this.data.collegeList;
    let competitionList = this.data.competitionList;
    for(let i = 0; i < levelList.length; i++) {
        levelList[i].status = 'line-gray';
    }
    for(let i = 0; i < collegeList.length; i++) {
        collegeList[i].status = 'line-gray';
    }
    for(let i = 0; i < competitionList.length; i++) {
      competitionList[i].isShow = true;
    }
    this.setData({
      collegeList: collegeList,
      levelList: levelList,
      competitionList: competitionList,
      keyword: [],
    })
  },

  // tab页面跳转
  pageChange(e){
    var page_name = e.currentTarget.dataset.cur;
    // console.log(page_name);
    if(page_name != "events") 
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