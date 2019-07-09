// pages/usercenter/usercenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    msgData:[

    ]

  },

  changeInputVal(ev) { //和页面input输入框绑定了value值
    this.setData({
      inputVal:ev.detail.value
    })
  },

  addmsg() { //拿到输入框的值
    var list = this.data.msgData;
    list.push({
      msg:this.data.inputVal
    })

  this.setData({
    msgData:list,
    inputVal:''
  })
},

  delmsg(ev){ //删除留言
    console.log(ev.target.dataset.usercenter)
    var n = ev.target.dataset.usercenter;
    var list = this.data.msgData;
    list.splice(n,1);

    this.setData({
      msgData:list
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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

  },

})