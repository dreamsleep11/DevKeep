'use strtic'
// currentUser
module.exports = {
  init: function (app) {
    app.get('/api/currentUser', (req, res) => {
      console.log('currentUser do ' + global.getClientIp(req))
      if (req.session.user) {
        // 查询用户信息
        res.send({
          name: 'Serati M111a',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          notifyCount: 0
        })
      } else {
        res.statusCode = 401
        res.send({ sucess: false, messag: '用户身份验证失败' })
      }
    })
  }
}
