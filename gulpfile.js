let gulp = require('gulp')
let del = require('del')
let bowerFiles = require('main-bower-files')
let $ = require('gulp-load-plugins')({ lazy: true })

let config = require('./gulp.config')()

gulp.task('help', $.taskListing)
gulp.task('default', ['help'])

gulp.task('clean-styles', function (done) {
  clean(config.css, done)
})

gulp.task('styles', ['clean-styles'], function (done) {
  gulp.src(config.scss)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.src + 'css/'))
    // .pipe($.minifyCss({
    //   keepSpecialComments: 0
    // }))
    // .pipe($.rename({ extname: '.min.css' }))
    // .pipe(gulp.dest(config.src + 'css/'))
    .on('end', done)
})

gulp.task('wiredep', function () {
  log('Wire up the bower css/js into index.html')
  var options = config.getBowerFilesDefaultOptions()
  // var bowerOrdered = gulp.src(bowerFiles(options), { read: false })
  //     .pipe($.order(['**/*jquery.*js']))

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(bowerFiles(options), { read: false }), { name: 'bower', relative: true }))
    .pipe(gulp.dest(config.src))
})

gulp.task('inject', ['wiredep'], function () {
  log('Wire up the app css/js into index.html')

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.js, { read: false }), { relative: true }))
    .pipe($.inject(gulp.src(config.css, { read: false }), { relative: true }))
    .pipe(gulp.dest(config.src))
})

gulp.task('watch', ['inject'], function () {
  gulp.watch(config.scss, ['styles'])
  $.watch(config.css, { events: ['add', 'unlink'] }, wireAppCss)
  $.watch(config.js, { events: ['add', 'unlink'] }, wireAppJs)
})

////////////////////////////

function wireAppJs() {
  log('Wire up the app js into index.html')

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.js, { read: false }), { relative: true }))
    .pipe(gulp.dest(config.src))
}

function wireAppCss() {
  log('Wire up the app css into index.html')

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css, { read: false }), { relative: true }))
    .pipe(gulp.dest(config.src))
}

function clean(path, done) {
  log('Cleaning: ' + path)
  del(path).then(function () {
    done && done()
  })
}

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]))
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg))
  }
}
