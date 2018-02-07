'use strict'

module.exports = {
  getUserById: function (userId) {
    return global.co(function * () {
      let sql = 'select * from user where user_id=?'
      return global.mysql_loop.execSql(global.mysql.format(sql, [userId]))
    })
  }
}
