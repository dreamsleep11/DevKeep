'use strict'
global.co = require('co')
global.mysql = require('mysql')
global.mysql_pool = require('./src/db/mysql_pool.js')
global.module = require('./src/module')
global.mapper = require('./src/mapper')
global.controller = require('./src/controller')
global.getClientIp = function getClientIp (req) {
  var ipAddress
  var forwardedIpsStr = req.header('x-forwarded-for')
  if (forwardedIpsStr) {
    var forwardedIps = forwardedIpsStr.split(',')
    ipAddress = forwardedIps[0]
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress
  }
  return ipAddress
}
