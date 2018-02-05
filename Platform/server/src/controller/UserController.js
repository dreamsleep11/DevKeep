'use strtic'
// currentUser
module.exports = {
  init: function (app) {
    app.get('/api/currentUser', (req, res) => {
      global.co(function * () {
        let result = yield global.mapper.AccountMapper.queryAccount('admin')
        console.log('currentUser do ' + global.getClientIp(req))
        if (req.session.user) {
          // 查询用户信息
          res.send({
            name: result.results[0].account,
            avatar: result.results[0].account.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userid: result.results[0].user_id,
            notifyCount: 0
          })
        } else {
          res.statusCode = 401
          res.send({ sucess: false, messag: '用户身份验证失败' })
        }
      })
    })
  }
}
