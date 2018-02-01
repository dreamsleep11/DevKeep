'use strict'
module.exports = {
  doTest: function () {
    return global.co(function * () {
      let results = yield global.mysql_pool.exec({ sql: 'select * from Api', options: undefined })
      return results
    })
  }
}
