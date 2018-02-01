'use strict';

var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');
var url = require('url');
var fs = require('fs');

var PROXY_PORT = 8000;
var proxy, server;

// Create a proxy server with custom application logic
proxy = httpProxy.createProxy({
});
var apimcert = fs.readFileSync('./openssl.pfx');
proxy.on('error', function (err) {
  console.log('ERROR');
  console.log(err);
});
var options = {
  passphrase: 'pAssw0rd',
  rejectUnauthorized: 'false',
  agent: false
};
server = http.createServer(function (req, res) {
  //var finalUrl = req.url,
  let finalUrl = 'https://vhsupply.test.viewchain.net';
  let finalAgent = null;
  let parsedUrl = url.parse(finalUrl);
  console.info(req.url)
  if (parsedUrl.protocol === 'https:') {
    finalAgent = https.globalAgent;
  } else {
    finalAgent = http.globalAgent;
  }
  let host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress, sendUrl = req.url;
  console.log("sendUrl：" + sendUrl + "，client ip:" + ip + ", host:" + host);
  switch (true) {
    case /^\/api1\/api/.test(sendUrl):
      console.info("/api1/api 拦截1111成功");
      proxy.web(req, res, {
        target: "https://www.baidu.com",
        agent: finalAgent,
        headers: { host: url.parse("https://www.baidu.com").hostname },
        prependPath: false,
        xfwd: true,
        hostRewrite: finalUrl.host,
        protocolRewrite: url.parse("https://www.baidu.com").protocol
      });
      break;
    default:
      console.info("所有拦截失败");
      proxy.web(req, res, {
        target: "https://vhsupply.test.viewchain.net",
        agent: finalAgent,
        headers: { host: url.parse("https://vhsupply.test.viewchain.net").hostname },
        prependPath: false,
        xfwd: true,
        hostRewrite: "https://vhsupply.test.viewchain.net".host,
        protocolRewrite: url.parse("https://vhsupply.test.viewchain.net").protocol
      });
      break;
  }
});
console.log('listening on port ' + PROXY_PORT);
server.listen(PROXY_PORT);