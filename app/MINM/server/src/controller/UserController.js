'use strtic'
// currentUser
module.exports = {
  init: function (app) {
    app.get('/api/currentUser', (req, res) => {
      console.log('currentUser do')
      console.info(req.session)
      global.co(function * () {
        res.send({
          name: 'Serati M111a',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          notifyCount: 0
        })
      })
    })
  }
}
