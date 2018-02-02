'use strict'

var http = require('http')
var https = require('https')
var httpProxy = require('http-proxy')
var url = require('url')
// var fs = require('fs')

var PROXY_PORT = 8001
var proxy, server

// Create a proxy server with custom application logic
proxy = httpProxy.createProxy({
})
// var apimcert = fs.readFileSync('./openssl.pfx')
proxy.on('error', function (err) {
  console.log('ERROR')
  console.log(err)
})
// var options = {
//   passphrase: 'pAssw0rd',
//   rejectUnauthorized: 'false',
//   agent: false
// }
server = http.createServer(function (req, res) {
  // console.info('reqreqreqreqreqreqreqreqreqreq')
  // console.info(req)
  // console.info('reqreqreqreqreqreqreqreqreqreq')
  // var finalUrl = req.url,
  let finalUrl = 'https://vhsupply.test.viewchain.net'
  let finalAgent = null
  let parsedUrl = url.parse(finalUrl)
  // console.info(req.url)
  if (parsedUrl.protocol === 'https:') {
    finalAgent = https.globalAgent
  } else {
    finalAgent = http.globalAgent
  }
  let host = req.headers.host
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let sendUrl = req.url
  console.log('sendUrl：' + sendUrl + '，client ip:' + ip + ', host:' + host)
  // proxy.on('proxyRes', function (proxyRes, req, res, options) {
  //   // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar')
  //   console.log('proxyResproxyResproxyResproxyResproxyRes')
  //   console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2))
  //   // console.log('RAW Response from the target', JSON.stringify(proxyRes.body, true, 2))
  // })
  // proxy.on('proxyReq', function (proxyRes, req, res, options) {
  //   // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar')
  //   if (req.body) {
  //     console.log('RAW Response from the target', JSON.stringify(req.body, true, 2))
  //   }
  //   // console.log('RAW Response from the target', JSON.stringify(proxyRes.body, true, 2))
  // })
  switch (true) {
    case /^\/api1\/api/.test(sendUrl):
      console.info('/api1/api 拦截1111成功')
      proxy.web(req, res, {
        target: 'https://vhsupply.test.viewchain.net',
        agent: finalAgent,
        headers: { host: url.parse('https://vhsupply.test.viewchain.net').hostname },
        prependPath: false,
        xfwd: true,
        hostRewrite: finalUrl.host,
        protocolRewrite: url.parse('https://vhsupply.test.viewchain.net').protocol
      })
      break
    default:
      console.info('所有拦截失败')
      proxy.web(req, res, {
        target: 'https://vhsupply.test.viewchain.net',
        agent: finalAgent,
        headers: { host: url.parse('https://vhsupply.test.viewchain.net').hostname },
        prependPath: false,
        xfwd: true,
        hostRewrite: 'https://vhsupply.test.viewchain.net'.host,
        protocolRewrite: url.parse('https://vhsupply.test.viewchain.net').protocol
      })
      break
  }
})
console.log('listening on port ' + PROXY_PORT)
server.listen(PROXY_PORT)
