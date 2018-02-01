'use strict'
module.exports = {
  createApi: function (api) {
    console.info('createApi')
    return global.mysql_pool.exec(api, global.mysql_pool.EXEC_INSERT)
  }
}
