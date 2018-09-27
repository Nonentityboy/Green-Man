// pages/menu/menu.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    greenImg:[
      { img: "/imgs/green1.png" },
      { img: "/imgs/green2.png" },
      { img: "/imgs/green3.png" },
    ],
    callable:[
      {
        img: "/imgs/recover1.png",
        descript:"废塑料瓶"
      },
      {
        img: "/imgs/recover2.png",
        descript: "废纸品"
      },
      {
        img: "/imgs/recover3.png",
        descript: "闲置衣物"
      },
      {
        img: "/imgs/recover4.png",
        descript: "废旧金属"
      },
      {
        img: "/imgs/recover5.png",
        descript: "废旧玻璃"
      },
      {
        img: "/imgs/recover7.png",
        descript: "废旧手机"
      },
      {
        img: "/imgs/recover8.png",
        descript: "废旧家电"
      },
      {
        img: "/imgs/recover6.png",
        descript: "旧电池"
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(11111)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，体验版不会弹框
          wx.getUserInfo({
            success: res => {
              
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
          // 调用云函数
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              console.log(2222)
              console.log('[云函数] [login] user openid: ', res.result.userInfo.openId)
              app.globalData.openid = res.result.userInfo.openId
              // wx.navigateTo({
              //   url: '../userConsole/userConsole',
              // })
              const db = wx.cloud.database()
              // 查询当前用户所有的 counters
              db.collection('userMessage').where({
                _openid: this.data.openid
              }).get({
                success: res => {
                  this.setData({
                    queryResult: JSON.stringify(res.data, null, 2)
                  })
                  console.log('[数据库] [查询记录] 成功: ', res)
                  app.globalData.userMessage = res;
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
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
              wx.navigateTo({
                url: '../deployFunctions/deployFunctions',
              })
            }
          })
        }
      }
    })
  },
  appointMent:res=>{
    if (app.globalData.userMessage.data.length == 0){
      wx.navigateTo({
        url: "../addAddress/addAddress"
      })
    }
    else{
      wx.navigateTo({
        url: "../confirmAddress/confirmAddress"
      })
    }
  }
})