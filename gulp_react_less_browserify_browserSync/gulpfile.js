var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var reactify = require('reactify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var cssmin = require("gulp-cssmin");
var sass = require("gulp-sass");
var gconcat = require('gulp-concat');
var autoprefixer = require("gulp-autoprefixer");
var webserver = require('gulp-webserver');

var handleErrors = function(err) {
  gutil.log(gutil.colors.red(err));
  notify.onError('browserify failed, check the logs..')(err);
  this.emit('end');
};

gulp.task('browserify', function() {
  browserify('./app/index.js', { debug: true })
    .transform(reactify)
    .bundle()
    .on("error", handleErrors)
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dev/js/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("sass", function() {
	gulp.src("./sass/**/*.scss")
    .pipe(plumber(
      {
        errorHandler: notify.onError("Error: <%= error.message %>")
      }
    ))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gconcat("style.css"))
    .pipe(gulp.dest("./dev/css/"))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['sass', 'browserify']);

gulp.task('deploy', function () {
  browserify('./app/index.js', { debug: false })
    .transform(reactify)
    .bundle()
    .on("error", handleErrors)
    .pipe(source('index.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist/js/'));

	gulp.src("./sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gconcat("style.css"))
    .pipe(gulp.dest("./dest/css"))
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css"))
});

gulp.task('serve', ['sass', 'browserify'], function () {
    browserSync.init({
        server: {
            baseDir: "./dev"
        }
    });
    gulp.watch("app/**/*.js", ['browserify'], browserSync.reload);
  	gulp.watch("sass/**/*.scss", ['sass'], browserSync.reload);
});
