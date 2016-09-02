var gulp = require("gulp");
var server = require("gulp-server-livereload");
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

//BUILD
gulp.task('build', function () {
     gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('build'));
});

//SERVER-LiveReload
gulp.task('start', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

//Sass-Autoprefixer
gulp.task('styles', function () {
	gulp.src('app/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
            browsers: ['last 30 versions']
        }))
		.pipe(gulp.dest('app/css'));
});
 
//Server-LiveReloader-Sass-Autoprefixer
gulp.task('default', ['start'], function () {
  gulp.watch('app/sass/**/*.sass', ['styles']);
});



