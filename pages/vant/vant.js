// pages/vant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    cataList: [],
    bannerList: [],
    indexList: [],
    myItem: [{
        title: "我的喜欢",
        icon: "icon-xihuan"
      },
      {
        title: "离线缓存",
        icon: "icon-download"
      },
      {
        title: "播放历史",
        icon: "icon-bofanglishi"
      },
      {
        title: "我的消息",
        icon: "icon-tongzhi"
      },
      {
        title: "设置",
        icon: "icon-shezhi"
      },
      {
        title: "问题反馈",
        icon: "icon-iconfk"
      }
    ]
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'success',
    // });
  },
  showOverlay() {
    this.setData({
      show: true
    })
  },
  hideOverlay() {
    this.setData({
      show: false
    })
  },
  // 跳转到播放页面
  routerToPlay(e) {
    console.log(e)
    // console.log(this.data.postItem)
    wx.navigateTo({
      url: '/pages/playPage/playPage?postId=' + e.currentTarget.dataset.post,
    })
  },
  // 获取分类页的数据和本地存储
  getCateList() {
    // 获取本地存储
    var getcataList = wx.getStorageSync('cataList')

    // 判断存储时间是否过期
    if (getcataList && getcataList.expires > Date.now()) {
      console.log(getcataList)
      this.setData({
        cataList: getcataList.data
      })
    } else {
      // 显示加载页面
      this.showOverlay()
      // 数据请求
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',
        success: (reponse) => {
          console.log(reponse)
          // 如果数据存在
          if (reponse.data.data) {
            // 赋值
            this.setData({
              cataList: reponse.data.data
            })
            // 将数据存储
            wx.setStorage({
              // 存储键名
              key: "cataList",
              data: {
                // 有效日期和数据
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: reponse.data.data
              }
            })
          } else {
            // 通知用户数据有错
          }

        },
        complete: () => {
          // 执行完毕，隐藏加载页面
          this.hideOverlay()
        }
      })
    }

  },
  getIndex() {
    // 获取本地存储
    // var getcataList = wx.getStorageSync('cataList')
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success: (reponse) => {
        console.log(reponse)
        // 如果数据存在
        if (reponse.data.data) {
          this.setData({
            indexList: reponse.data.data,
          })
        }
      },
      complete: () => {
        // 执行完毕，隐藏加载页面
        this.hideOverlay()
      }
    })
    // 判断存储时间是否过期
    // if (getcataList && getcataList.expires > Date.now()) {
    //   console.log(getcataList)
    //   this.setData({
    //     cataList: getcataList.data
    //   })
    // } else {
    //   // 显示加载页面
    //   this.showOverlay()
    //   // 数据请求
    //   wx.request({
    //     url: 'https://app.vmovier.com/apiv3/index/index',
    //     success: (reponse) => {
    //       console.log(reponse)
    //       // 如果数据存在
    //       if (reponse.data.data) {
    //         // 赋值
    //         this.setData({
    //           cataList: reponse.data.data
    //         })
    //         // 将数据存储
    //         wx.setStorage({
    //           // 存储键名
    //           key: "cataList",
    //           data: {
    //             // 有效日期和数据
    //             expires: Date.now() + 3 * 60 * 60 * 1000,
    //             data: reponse.data.data
    //           }
    //         })
    //       } else {
    //           // 通知用户数据有错
    //       }

    //     },
    //     complete: () => {
    //       // 执行完毕，隐藏加载页面
    //       this.hideOverlay()
    //     }
    //   })
    // }
  },
  switchMovieTab(e) {
    console.log(e)
  },
  routerToList(e) {
    // console.log(e)
    // 也许是因为van-grid-item是组件，事件和自定义属性并不是绑定在van-grid-item组件，而是绑定在了其父组件上，而van-grid-item组件内部没有自定义属性和id属性，所以只有e.currentTarget有值，e.target没有值
    console.log(e.currentTarget.dataset.cateid)
    wx.navigateTo({
      url: '/pages/post/post?id=' + e.currentTarget.dataset.cateid,
    })
  },

  onClickLeft() {
    wx.showToast({
      title: '点击返回',
      icon: 'none'
    });
  },
  onClickRight() {
    wx.showToast({
      title: '点击按钮',
      icon: 'none'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList()
    this.getIndex()
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