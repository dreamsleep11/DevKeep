'use strict'

module.exports = {
  table: 'api',
  col: {
    id: undefined,
    path: undefined,
    name: undefined,
    desc: undefined,
    locked_by: undefined,
    is_locked: undefined,
    project_id: undefined
  },
  where: [],
  selectCol: [],
  init: function (col) {
    this.col = JSON.parse(JSON.stringify(col))
  },
  // 弃用
  sql_create: function () {
    let v = []
    for (let i = 0; i < Object.keys(this.col).length; i++) {
      v.push('?')
    }
    return {
      sql: 'INSERT INTO api (`' + Object.keys(this.col).join('`,`') + '`) VALUES (' + v.join(',') + ')',
      options: Object.values(this.col)
      // [this.col.path, this.col.name, this.col.desc]
    }
  },
  // 弃用
  sql_update: function () {
    return {
      sql: 'INSERT INTO api (`path`,`name`,`desc`) VALUES (?,?,?)',
      options: [this.col.path, this.col.name, this.col.desc]
    }
  }
}
