'use strict'
let serviceMsg = require('../module/ServiceMsg')
module.exports = {
  getUserById: function (userId) {
    return global.co(function * () {
      try {
        let result = yield global.mapper.UserMaper.getUserById(userId)
        if (result) {
          if (result.results.length > 0) {
            return serviceMsg.makeSuccess(result.results[0])
          } else {
            return serviceMsg.makeDefeated(null, '未找到对应的用户信息')
          }
        }
      } catch (error) {
        return serviceMsg.makeError(error)
      }
    })
  }
}
