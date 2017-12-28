var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var errorify = require('errorify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var sass = require("gulp-sass");
var chalk = require("chalk");


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
  ENTRY_POINT: './app/main.js',
  SASS_SRC_GLOB: './app/styles/**/*.scss',
  SASS_BUILD: 'public/stylesheets/'
};

function getWatcher() {
  var b = browserify({
    entries: [paths.ENTRY_POINT],
    transform: [
      ["babelify", {
        presets: ["es2015", "es2016", "react"],
        plugins: ["transform-object-rest-spread"]
      }]
    ],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  })

  b.plugin(errorify)

  var watcher  = watchify(b);

  return watcher
}

function sassBuild(sourceGlob, distDirectory) {
    return function() {
        gulp.src(sourceGlob)
        .pipe(sass())
        .on("error", customErrorHandler)
        .pipe(gulp.dest(distDirectory))
    }
}


gulp.task('watch-scss', function() {
  gulp.watch(paths.SASS_SRC_GLOB, ['sass'])
})

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

// sass build
gulp.task('sass', sassBuild(paths.SASS_SRC_GLOB, paths.SASS_BUILD))

// js build
gulp.task('js', function() {
  browserify({
    entries: [paths.ENTRY_POINT],
    transform: [
      ["babelify", {
        presets: ["es2015", "es2016", "react"],
        plugins: ["transform-object-rest-spread"]
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


gulp.task('build', ['js', 'sass']);

gulp.task('default', ['watch', 'watch-scss']);



//------------------------------------
function customErrorHandler(error) {
    var spacers = Array(24).join("_ ");

    console.error( chalk.yellow(spacers) )
    console.error( chalk.red(">> ") + "Oops... " + chalk.cyan(error.name) + " from gulp watch" +'\n')
    if(error.loc)       console.error( error.loc )
    if(error.filename)  console.error('file:' + error.filename)
    console.error( error.stack );
    console.error( '\n...this has paused the build, but ' +chalk.bold('gulp watch is still running!') + chalk.green(" :)"))
    console.error( chalk.yellow(spacers) )

    // console.log(error.filename)
    this.emit("end");
}