var app = getApp();
// 设置订单地址信息 
Page({
  data: {
  },
  bindCancel: function () {
    wx.navigateBack({
      url: '/pages/menu/menu',
    })
  },
  fromSubmit: function (e) {
    var value = e.detail.value;
    // 判断表单是否为空
    if (value.userName === "" || value.userAddress === "" || value.userPhone === "") {
      wx.showModal({
        content: '请完善信息',
      })
    } else {
      let userId = app.globalData.userId;
      const db = wx.cloud.database()
      db.collection('userMessage').add({
        data: {
          count: value,
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id,
            count: 1
          })
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          wx.reLaunch({
            url: '../menu/menu',
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
      // wx.request({
      //   url: 'https://cxd.mynatapp.cc/user/info/' + userId,
      //   method: 'POST',
      //   data: JSON.stringify(value),
      //   header: {
      //     'content-type': 'application/json;charset=UTF-8'
      //   },
      //   success: function (resInfo) {
      //     // console.log("结果", resInfo);
      //     wx.navigateTo({
      //       url: '/pages/submit/submit',
      //     })
      //   },
      //   error: function () {
      //     console.log("错误");
      //   }
      // })
      app.globalData.address = value;
    }
  }
});