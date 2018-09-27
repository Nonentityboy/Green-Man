// 云函数模板
// 第一步部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *   
 * event 参数包含
 * - 小程序端调用传入的 data
 * - 经过微信鉴权直接可信的用户唯一标识 openid 
 * 
 */
exports.main = (event, context) => {
  let { userInfo, a, b } = event
  let { openId, appId } = userInfo // 这里获取到的 openId 和 appId 是可信的
  let sum = a + b
  return {
    openId,
    appId,
    sum
  }
}