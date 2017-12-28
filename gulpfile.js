var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var errorify = require('errorify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');


//--------------------------------
// Gulp processing
//
// Single entry point for React 
// app is '/app/main.js'
//
// paths.ENTRY_POINT
//
//--------------------------------
var paths = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST_BUILD: 'public/js/build',
  DEST_SRC: 'public/js/src',
  ENTRY_POINT: './app/main.js'
};

function getWatcher() {
  var b = browserify({
    entries: [paths.ENTRY_POINT],
    transform: [
      ["babelify", {
        presets: ["es2015", "es2016", "react"]
      }]
    ],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  })

  b.plugin(errorify)

  var watcher  = watchify(b);

  return watcher
}


// watch
gulp.task('watch', function() {
  var watcher = getWatcher();

  return watcher.on('update', function () {
      watcher.bundle()
        .pipe(source(paths.OUT))
        .on("error", (err) => console.log(err))
        .pipe(gulp.dest(paths.DEST_SRC))

        console.log('Updated');
    })
      .bundle()
      .pipe(source(paths.OUT))
      .on("error", (err) => console.log(err))
      .pipe(gulp.dest(paths.DEST_SRC))
});


// build
gulp.task('build', function() {
  browserify({
    entries: [paths.ENTRY_POINT],
    transform: [
      ["babelify", {
        presets: ["es2015", "es2016", "react"]
      }]
    ],
    debug: true
  })
    .bundle()
    .pipe(source(paths.OUT))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.DEST_SRC))
    .on("error", (err) => console.log(err));
});


gulp.task('production', ['build']);

gulp.task('default', ['watch']);