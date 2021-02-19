//app.js
App({
  onLaunch: function() {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
  },
  globalData: {
    levelList:[
      {status: "line-gray",name: "院级",},
      {status: "line-gray",name: "校级",},
      {status: "line-gray",name: "市级",},
      {status: "line-gray",name: "省级",},
      {status: "line-gray",name: "国家级",},
      {status: "line-gray",name: "国际级",},
    ],
    collegeList:[
      {status: "line-gray",name: "软件学院",},
      {status: "line-gray",name: "国际商学院",},
      {status: "line-gray",name: "城市文化学院",},
      {status: "line-gray",name: "职业教育学院",},
      {status: "line-gray",name: "经济管理学院",},
      ],
    typeList:['个人赛','团队赛'],
  }
})