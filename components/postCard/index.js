// components/postCard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    postItem:Object
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    routerToPlay(e){
      console.log(e)
      console.log(this.data.postItem)
      wx.navigateTo({
        url: '/pages/playPage/playPage?postId='+e.currentTarget.dataset.post.postid,
      })
    },
  }
})
