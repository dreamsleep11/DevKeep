'use strict'

module.exports = {
  queryAccount: function (account) {
    return global.co(function * () {
      let sql = 'select * from account where `account`=?'
      let runSql = global.mysql.format(sql, [account])
      let result = yield global.mysql_pool.execSql(runSql)
      return result
    })
  }
}
