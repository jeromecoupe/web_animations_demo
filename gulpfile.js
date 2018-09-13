const gulp = require("gulp");
const eslint = require("gulp-eslint");
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./js/**/*"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
// folder only, filename is specified in webpack config
function scriptsBuild() {
  return gulp
    .src(["./js/**/*"])
    .pipe(plumber())
    .pipe(webpackstream(webpackconfig, webpack))
    .pipe(gulp.dest("./_site/assets/js/"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./js/**/*", gulp.series(scriptsLint, scriptsBuild));
}

// build
gulp.task("build", gulp.series(scriptsLint, scriptsBuild));

// watch
gulp.task("watch", watchFiles);
