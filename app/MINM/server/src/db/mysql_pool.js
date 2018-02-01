'use strict'
var mysql = require('mysql')
var pool = mysql.createPool({
  host: '192.168.0.110',
  user: 'root',
  password: '123456',
  database: 'testdog',
  port: 3306
})

module.exports = {
  EXEC_UPDATE: 'EXEC_UPDATE',
  EXEC_SELECT: 'EXEC_SELECT',
  EXEC_INSERT: 'EXEC_INSERT',
  EXEC_DELETE: 'EXEC_DELETE',
  execSql: function (sql) {
    let runSql = sql
    return new Promise(function (resolve, reject) {
      pool.getConnection(function (err, conn) {
        if (err) {
          reject(err)
        } else {
          conn.query(runSql, function (err, results, fields) {
            console.info('runningSql:[' + runSql + ']')
            // 释放连接
            conn.release()
            // 回调
            resolve({ err: err, results: results, fields: fields })
          })
        }
      })
    })
  },
  exec: function (module, runType) {
    if (runType === this.EXEC_INSERT) {
      return this.doInster(module)
    }
    if (runType === this.EXEC_DELETE) {
      return this.doDelete(module)
    }
    if (runType === this.EXEC_UPDATE) {
      return this.doUpdate(module)
    }
    if (runType === this.EXEC_SELECT) {
      return this.doSelect(module)
    }
    return new Promise(function (resolve, reject) {
      resolve({ 'code': 1001, 'msg': '操作类型错误' })
    })
  },
  doInster: function (module) {
    let v = []
    for (let i = 0; i < Object.keys(module.col).length; i++) {
      v.push('?')
    }
    let sql = 'INSERT INTO ' + module.table + ' (`' + Object.keys(module.col).join('`,`') + '`) VALUES (' + v.join(',') + ')'
    let options = Object.values(module.col)
    return this.execSql(mysql.format(sql, options))
  },
  doUpdate: function (module) {

  },
  doDelete: function (module) { },
  doSelect: function (module) { }
}
