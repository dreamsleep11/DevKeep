'use strict'
let serviceMsg = require('../module/ServiceMsg')
// import serviceMsg from '../module/ServiceMsg'
module.exports = {
  validationAccount: function (account, password) {
    console.log(account)
    console.log(password)
    return global.co(function * () {
      try {
        let dataAcc = yield global.mapper.AccountMapper.queryAccount(account)
        if (dataAcc.results.length > 0) {
          // console.log(JSON.stringify(dataAcc))
          if (dataAcc.results[0].password === password) {
            // console.log('dataAcc=====' + JSON.stringify(dataAcc))
            return serviceMsg.makeSuccess({ userId: dataAcc.results[0]['user_id'] })
          } else {
            return serviceMsg.makeDefeated(null, '用户或密码错误')
          }
        } else {
          return serviceMsg.makeDefeated(null, '用户或密码错误')
        }
      } catch (error) {
        return serviceMsg.makeError(error)
      }
    })
  }
}
