'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var app = express()
const port = 3333
const ip = '127.0.0.1'
require('../global')
app.use(cookieParser('sessionDocKeep'))
app.use(session({
  secret: 'sessionDocKeep', // 与cookieParser中的一致
  resave: true,
  saveUninitialized: true
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.listen(port, ip, function () {
  console.log(`服务器启动成功 请访问http://${ip}:${port}`)
}) // ip 这个参数可不写，默认本地

// 注册controller
global.controller.forEach(currentItem => {
  currentItem.init(app)
})
