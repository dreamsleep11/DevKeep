'use strict'
module.exports = {
  init: function (app) {
    app.post('/api/login/account', function (req, res) {
      console.log(req.session)// 打印session的值
      const { type } = req.body
      let user = {
        status: 'ok',
        type,
        currentAuthority: 'admin'
      }
      req.session.user = user
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      })
    })
  }
}
