Page({
  data: {
    title: null,

    // 当前轮播图的id
    cardCur: 0,
    // 轮播图数据
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.mathorcup.org/uploads/files/290cf9f84f52ee02cf0c29de792b4f89.png'
    }, {
      id: 1,
        type: 'image',
        url: 'http://3chuang.oss-cn-hangzhou.aliyuncs.com/slides/E58uaL7EVrHTpXiI4OL00HV3ySxMwq3WFx36nP1N.jpeg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://www.mathorcup.org/uploads/files/653059cd5ff45b196c6cbd2952e1677f.png'
    }, {
      id: 3,
      type: 'image',
      url: 'https://www.mathorcup.org/uploads/files/290cf9f84f52ee02cf0c29de792b4f89.png'
    }, {
      id: 4,
      type: 'image',
      url: 'http://3chuang.oss-cn-hangzhou.aliyuncs.com/slides/E58uaL7EVrHTpXiI4OL00HV3ySxMwq3WFx36nP1N.jpeg'
    }],
    // 热点资讯数据
    articleList:[
      {
        id: 0,
        title: "研究生导师一般希望招什么样的研究生？",
        src: "https://certificationmap.com/wp-content/uploads/sites/14/2020/05/master-of-arts-in-teaching.jpg",
        outline: "虽然还不是导师，但也在学校蹲了不少年头了，看着一级级研究生毕业奔赴各方，其实还是蛮有感触的。",
        tag:["考研保研","我的大学"]
      },
      {
        id: 1,
        title: "研究生导师一般希望招什么样的研究生？",
        src: "https://certificationmap.com/wp-content/uploads/sites/14/2020/05/master-of-arts-in-teaching.jpg",
        outline: "虽然还不是导师，但也在学校蹲了不少年头了，看着一级级研究生毕业奔赴各方，其实还是蛮有感触的。",
        tag:["考研保研","我的大学"]
      },
    ],
  },
  onLoad(options) {
    // 初始化towerSwiper 传已有的数组名即可
  },

  // cardSwiper
  cardSwiper(e) {
    // 更新当前item的id
    this.setData({
      cardCur: e.detail.current,
    })
  },
  
})