'use strict'
const api = require('../module/Api')
module.exports = {
  init: function (app) {
    app.get('/api/ApiController/create', (req, res) => {
      global.co(function * () {
        api.init({
          name: 'test',
          path: 'tttt',
          desc: '插入测试111'
        })
        res.send(yield global.mapper.ApiMapper.createApi(api))
      })
    })
  }
}
