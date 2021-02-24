const app = getApp(); console
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    levelList: app.globalData.levelList,
    collegeList: app.globalData.collegeList,
    screenShow:"none",  // 筛选框显示
    competitionList:[],
    keyword:[],  // 选中的关键词
    levelstand:["院级","校级","市级","省级","国家级","国际级"],
    collegestand:[
           "校方",
           "地理科学学院",
           "计算机学院",
           "教育科学学院",
           "教育信息技术学院",
           "历史文化学院",
           "马克思主义学院",
           "美术学院",
           "生命科学学院",
           "数学科学学院",
           "外国语言文化学院",
           "心理学院",
           "哲学与社会发展学院",
           "法学院",
           "化学学院",
           "环境学院",
           "经济与管理学院",
           "旅游管理学院",
           "体育科学学院",
           "文学院",
           "物理与电信工程学院",
           "信息光电子科技学院",
           "音乐学院",
           "政治与公共管理学院",
           "城市文化学院",
           "国际商学院",
           "软件学院",
           "职业教育学院"],
    levelnum:[],
    collegenum:[]
  },
  navigate(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../comp_info/comp_info?schoolcomp='+id,
    })
  },
  // 搜索
  searchItem(e) {
    let key = e.detail.value.toLowerCase();//获取输入框内的值
    let list = this.data.competitionList;//获取当前的列表数据
    for (let i = 0; i < list.length; i++) {
      let a = key;
      let b = list[i].compname.toLowerCase();
      if (b.search(a) != -1) {//在b中搜索有无a字段。
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
    this.setData({//筛选前先将列表数组清空
      competitionList:[],
      levelnum:[],
      collegenum:[]
    })
    var that=this
    let word = this.data.keyword;//两个筛选框中选中的选项（文字呈现、数组）
    for (let i = 0; i < word.length; i++) {//获取选中级别的对应的数字，作为筛选条件
      for(let j=0;j<that.data.levelstand.length;j++){
        if(word[i]==that.data.levelstand[j]){
          that.data.levelnum=that.data.levelnum.concat(j)
        }
      }
    }
    for (let i = 0; i < word.length; i++) {//获取选中学院的对应的数字，作为筛选条件
      for(let j=0;j<that.data.collegestand.length;j++){
        if(word[i]==that.data.collegestand[j]){
          that.data.collegenum=that.data.collegenum.concat(j)
        }
      }
    }
    //注意：接下来每次筛选完毕后需将levelnum和collegenum数组置空
    // console.log(that.data.levelnum.length)  
    // console.log(that.data.collegenum.length)
    if((that.data.levelnum.length==0)&&(that.data.collegenum.length!=0)){  
      console.log(1)
        for(let i=0;i<that.data.collegenum.length;i++){//获取competitionList
          wx.cloud.callFunction({
            name:"screencomp",
            data:{
              levelnum:-1,
              collegenum:that.data.collegenum[i]
            },
            success(res){             
              that.setData({
                competitionList:that.data.competitionList.concat(res.result.data),
              })                         
            }
          })
        }
    }else if((that.data.levelnum.length!=0)&&(that.data.collegenum.length==0)){
      console.log(that.data.levelnum)
      for(let i=0;i<that.data.levelnum.length;i++){//获取competitionList
        wx.cloud.callFunction({
          name:"screencomp",
          data:{
            levelnum:that.data.levelnum[i],
            collegenum:-1
          },
          success(res){
            console.log(res)
            that.setData({
              competitionList:that.data.competitionList.concat(res.result.data),
            })
          }
        })
      }
    }else if((that.data.collegenum.length==0)&&(that.data.levelnum.length==0)){
      console.log(1)
      that.getalllist()
    }else{
      for(let i=0;i<that.data.levelnum.length;i++){//获取competitionList
        for(let j=0;j<that.data.collegenum.length;j++){
          wx.cloud.callFunction({
            name:"screencomp",
            data:{
              levelnum:that.data.levelnum[i],
              collegenum:that.data.collegenum[j]
            },
            success(res){     
              that.setData({
                competitionList:that.data.competitionList.concat(res.result.data),
              })
            }
          })
        }
      }
    }

    
    // console.log(that.data.competitionList)     获取成功
    this.setData({
      screenShow: 'none',
    })
  },

  // 重置
  reset(e) {
    //重置筛选栏
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
      keyword: [],
    })
    //重置后重新获取全部数据
    this.getalllist()
    this.setData({
      screenShow: 'none',
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
  //获取所有赛事信息
  getalllist(){
    var that=this
    wx.cloud.callFunction({
      name:"Bcomplist",
      data:{
        school:1
      },
      success(res){
        that.setData({
          competitionList:res.result.data.reverse()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.getalllist()
        }else{
          wx.showModal({
                  openid:"提示",
                  content: "请先完成授权",
                  success: function(res){
                  if (res.confirm) {//点击确定后跳转至信息完善界面
                    wx.redirectTo({
                      url: '../../my/home/home',
                    })
                  } else if (res.cancel) {
                    wx.redirectTo({
                      url: '../../index/home/home',
                    })
                  }
                  }
                })
        }
      }
    })
    
  },

  onShow: function () {
    this.onLoad()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})