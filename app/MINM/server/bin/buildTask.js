const gulp = require('gulp')
const fs = require('fs')
const del = require('del')

function listDepDir (dir, callback) {
  var flist = fs.readdirSync(dir)
  for (var i = 0; i < flist.length; i++) {
    var item = flist[i]
    var info = fs.statSync(dir + item)
    if (info.isDirectory()) {
      listDepDir(dir + item + '/', callback)
    } else {
      callback(item, info)
    }
  }
}
// 代码注入

// 创建index.js
gulp.task('makeControllerIndex', function (cb) {
  console.log('makeControllerIndex-------------')
  // controllerInde maker
  let controllerArr = ['var arr = []']
  listDepDir('./src/controller/', (file) => {
    if (file.endsWith('.js') && file !== 'index.js') {
      controllerArr.push(`arr = arr.concat(require('./${file}'))`)
    }
  })
  controllerArr.push('module.exports = arr')
  fs.writeFileSync('./src/controller/index.js', controllerArr.join('\n'))

  let mapperArrau = ['module.exports = {']
  listDepDir('./src/mapper/', (file) => {
    if (file.endsWith('.js') && file !== 'index.js') {
      mapperArrau.push(`  '${file.replace('.js', '')}': require('./${file}'), `)
    }
  })
  mapperArrau.push('}')
  fs.writeFileSync('./src/mapper/index.js', mapperArrau.join('\n'))

  let ModuleArrau = ['module.exports = {']
  listDepDir('./src/module/', (file) => {
    if (file.endsWith('.js') && file !== 'index.js') {
      ModuleArrau.push(`  '${file.replace('.js', '')}': require('./${file}'), `)
    }
  })
  ModuleArrau.push('}')
  fs.writeFileSync('./src/module/index.js', ModuleArrau.join('\n'))
  cb()
})
gulp.task('clean', function (cb) {
  console.log('clean-------------')
  del([process.cwd() + `/out/dev/*`], cb)
  del([process.cwd() + `/out/dist/*`], cb)
  cb()
  // content
})

gulp.task('moveSrc', ['movefile'], function (cb) {
  console.log('moveSrc-------------')
  gulp.src('./src/**/*')
    .pipe(gulp.dest(`.${global.basepath}/src/`))
  cb()
  // content
})
gulp.task('movefile', ['makeControllerIndex'], function (cb) {
  console.log('movefile-------------')
  // content
  gulp.src('./global.js')
    .pipe(gulp.dest(`.${global.basepath}/`))
  cb()
})
