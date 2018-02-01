'use strict'
module.exports = {
  init: function (app) {
    app.post('/api/login/account', function (req, res) {
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
