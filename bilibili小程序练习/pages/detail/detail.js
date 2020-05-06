// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfo:{},
    otherList:[],
    commentList:[],
    commentTotalCount:null
  },
  /**
   * 获取视频详情by id
   */
  getCurrentVideo(videoId){
    let that=this;
    wx.request({
      url: 'http://mock-api.com/mnEe4VnJ.mock/videoDetail?id='+videoId,
      success(res){
        //console.log(res);
        if(res.data.code===0){
          that.setData({
            videoInfo:res.data.data.videoInfo
          });
        }
      }
    })
  },
  /**
   * 获取推荐视频
   */
  getOthersList(){
    let that=this;
    wx.request({
      url: 'http://mock-api.com/mnEe4VnJ.mock/otherList',
      success(res){
        //console.log(res);
        if(res.data.code===0){
          that.setData({
            otherList:res.data.data.otherList,
     
          });
        }
      }
    })
   
  },
   /***
     * 获取视频评论
     */
    getCommentList(videoId){
      let that=this;
      wx.request({
        url: 'http://mock-api.com/mnEe4VnJ.mock/commentList?id='+videoId,
        success(res){
          console.log(res);
          that.setData({
            commentList:res.data.data.commentData.commentList,
            commentTotalCount:res.data.data.commentData.commentTotalCount
          });
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    let videoId=options.id;
    this.getCurrentVideo(videoId);
    this.getOthersList();
    this.getCommentList(videoId);
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