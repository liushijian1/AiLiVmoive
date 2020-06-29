// pages/post/post.js
import Notify from '@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cataid: null,
    post: [],
    page: 1,
    show:false,
    showMore:true
  },
  getPostCataid(id) {
    this.setData({
      show:true
    })
    wx.request({
      url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=${this.data.page}&size=10&cateid=${id}`,
      success: (res) => {
        if(res.data.msg!=="OK"){
          // 没有更多内容了
          Notify('没有更多内容了');
          this.setData({
            show:false,
            showMore:false
          })
        }
        console.log(res)
        this.setData({
          post:this.data.post.concat(res.data.data) 
        })
      },
      fail: (error) => {
        console.log(error)
      },
      complete:()=>{
        this.setData({
          show:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      cataid: options.id,
    })
    this.getPostCataid(options.id)
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
    if(this.data.showMore){
      this.setData({
        // 这里用不了++语法
        page:this.data.page+1
      }) 
        this.getPostCataid(this.data.cataid)
      }else{
        Notify('没有更多内容了');
      }
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})