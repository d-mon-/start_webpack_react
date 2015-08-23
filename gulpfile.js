/**
 * Created by GUERIN Olivier, on 23/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    path = require('path'),
    autoprefixer     = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify'),
    env = process.env.NODE_ENV || 'development';

//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
    title: 'Gulp'
};
//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        message: "Error: <%= error.message %>"
    })
};

//style
gulp.task('compass-dev', function () {
    gulp.src('./public/scss/**/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            css: 'public/stylesheets',
            sass: 'public/scss',
            image: 'public/image',
            sourcemap: true
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('app/assets/temp'))
        .pipe(livereload());
});

//style
gulp.task('compass-prod', function () {
    gulp.src('./public/scss/**/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            css: 'public/stylesheets',
            sass: 'public/scss',
            image: 'public/image'
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('app/assets/temp'));
});

//react script
gulp.task('react-scripts', function () {
    gulp.src(['app/main.js'])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify' ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

//watch
gulp.task('watch-files', function () {
    livereload.listen();
    //watch .scss files
    gulp.watch('src/scss/**/*.scss', ['compass-dev']);
});