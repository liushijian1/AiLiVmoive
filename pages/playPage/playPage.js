// pages/playPage/playPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:null,
    postView:null,
    viewShow:false
  },
  routerToPlay(e){
    console.log(e)
    // console.log(this.data.postItem)
    wx.navigateTo({
      url: '/pages/playPage/playPage?postId='+e.currentTarget.dataset.post,
    })
  },
  getPostView(postid){
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid='+postid,
      success:(res)=>{
        console.log(res)
        
        this.setData({
         postView:res.data.data,
         viewShow:true
        })
        // console.log(this.data.postView.relate_video[0].list)
      },
      complete:()=>{

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      postId:options.postId
    })
    this.getPostView(options.postId)
    
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