'use strict'

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var gutil = require('util');

gulp.task('sass', function () {
  gulp.src('source/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe( cleanCSS('output.min.css'))
    .pipe(gulp.dest(''));
});

gulp.task('html', function() {
  gulp.src('source/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(''))
});

gulp.task('coffee', function() {
  gulp.src('scripts/*.coffee', { sourcemaps: true })
    .pipe(coffee('script.js'), {bare : true})
    .pipe(gulp.dest('scripts'))
});

gulp.task('js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js'
  ])
  gulp.src('scripts/*.js')
    .pipe(concat('output.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(''))
});

gulp.task('watch', function () {
  gulp.watch('source/sass/*.sass', ['sass']);
  gulp.watch('source/pug/*.pug', ['html']);
  gulp.watch('scripts/*.coffee', ['coffee']);
  gulp.watch('scripts/*.js', ['js']);
});

gulp.task('default', ['sass', 'html', 'coffee', 'js']);
