'use strict'
let serviceMsg = require('../module/ServiceMsg')
module.exports = {
  init: function (app) {
    app.post('/api/login/account', function (req, res) {
      global.co(function * () {
        let { userName, password, type } = req.body
        let servicResult = yield global.service.LoginServer.validationAccount(userName, password)
        console.info('servicResult=' + JSON.stringify(servicResult))
        if (servicResult.error === serviceMsg.ERRORCODE.SUCCESS) {
          if (servicResult.result.error === serviceMsg.RESULTCODE.SUCCESS) {
            // 验证成功    根据user_id获取用户信息并写入sessin
            // console.log(JSON.stringify(servicResult))
            let userInfo = yield global.service.UserService.getUserById(servicResult.result.data['userId'])
            console.log('userInfo====' + JSON.stringify(userInfo))
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
          } else {
            req.session.user = null
            res.send({
              status: 'error',
              type,
              currentAuthority: 'admin'
            })
          }
        } else {
          req.session.user = null
          res.send({
            status: 'error',
            type,
            currentAuthority: 'admin'
          })
        }
      })
    })
  }
}
