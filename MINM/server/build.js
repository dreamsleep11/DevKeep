'use strict'
const gulp = require('gulp')
const cprocess = require('child_process')
// 启动服务监听
function startServer () {
  console.log('startServer')
  let workerProcess = cprocess.exec(`nodemon .${global.basepath}/src/app.js --watch .${global.basepath}`, {})
  workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })
  workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data)
  })
}
// var basepath = ''
var buildType = 'dev'
var runGulp = 'moveSrc'
if (process.argv.length < 3) {
  buildType = 'dev'
} else {
  buildType = process.argv[2]
}
if (buildType === 'dev') {
  console.log('dev-------------')
  global.basepath = '/out/dev'
  runGulp = 'moveSrc'
} else if (buildType === 'dist') {
  console.log('dist-------------')
  global.basepath = '/out/dist'
  runGulp = 'moveSrc'
} else if (buildType === 'clean') {
  runGulp = 'clean'
} else if (buildType === 'start') {
  global.basepath = '/out/dev'
}
require('./bin/buildTask')
if (buildType !== 'clean') {
  if (buildType === 'start') {
    startServer()
  }
}
if (buildType !== 'start') {
  gulp.start(runGulp, function (err, msg) {
    if (err) {
      console.info(err)
    } else {
      // deleteIndex()
      console.log('Build Success')
    }
  })
}
