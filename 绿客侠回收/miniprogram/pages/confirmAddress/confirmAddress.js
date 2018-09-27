var app = getApp();
// 设置订单地址信息 
Page({
  data: {
  },
  bindCancel: function () {
    
    wx.showLoading({
      title: '预约中',
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '预约成功',
      })
    }, 3000)
  },
  onLoad:function(){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('userMessage').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ', res.data[0])
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  fromSubmit: function (e) {
    wx.makePhoneCall({
      phoneNumber: '13109520177' //仅为示例，并非真实的电话号码
    })
    // wx.navigateBack({
    //   url: '/pages/menu/menu',
    // })
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx0173f279c7ef3985&secret=322451260e2ea717d3a9d403b0ee7c06',
    //   method: 'GET',
    //   data:{},
    //   success:function(res){
    //     console.log(res.data.access_token);
    //     app.globalData.access_token = res.data.access_token;
    //     let access_token = res.data.access_token;
    //     wx.request({
    //     url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token,
    //     method: 'POST',
    //   data:{
    //     "touser":app.globalData.openid,
    //     "template_id": "dFFDPUr6tOgWt-kefO3XCWdCBs6bm4cakOdy9drpr9M",
    //     "miniprogram": {
    //       "appid": "wx0173f279c7ef3985",
    //     },
    //     "data": {
    //       "keyword1": {
    //         "value": "巧克力",
    //         "color": "#173177"
    //       },
    //       "keyword2": {
    //         "value": "39.8元",
    //         "color": "#173177"
    //       },
    //       "keyword3": {
    //         "value": "2014年9月22日",
    //         "color": "#173177"
    //       },
    //       "keyword4": {
    //         "value": "2014年9月22日",
    //         "color": "#173177"
    //       },
    //       "keyword5": {
    //         "value": "2014年9月22日",
    //         "color": "#173177"
    //       },
    //     }
      
    //   },
    //   success: function (resInfo) {
    //       console.log("结果", resInfo);
    //       // wx.navigateTo({
    //       //   url: '/pages/submit/submit',
    //       // })
    //     },
    //     error: function () {
    //       console.log("错误");
    //     }
    //   })
    //   }
    // })
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN',
    //   method: 'POST',
    //   data:{
    //     "touser":app.globalData.openid,
    //     "template_id": "dFFDPUr6tOgWt-kefO3XCWdCBs6bm4cakOdy9drpr9M",
    //     "miniprogram": {
    //       "appid": "wx0173f279c7ef3985",
    //     },
    //     "data": {
    //       "keyword1": {
    //         "value": "巧克力",
    //         "color": "#173177"
    //       },
    //       "keyword2": {
    //         "value": "39.8元",
    //         "color": "#173177"
    //       },
    //       "keyword3": {
    //         "value": "2014年9月22日",
    //         "color": "#173177"
    //       },
    //       "keyword4": {
    //         "value": "2014年9月22日",
    //         "color": "#173177"
    //       },
    //       "keyword5": {
    //         "value": "2014年9月22日",
    //         "color": "#173177"
    //       },
    //     }
      
    //   },
    //   success: function (resInfo) {
    //       console.log("结果", resInfo);
    //       // wx.navigateTo({
    //       //   url: '/pages/submit/submit',
    //       // })
    //     },
    //     error: function () {
    //       console.log("错误");
    //     }
    //   })
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
  }
});