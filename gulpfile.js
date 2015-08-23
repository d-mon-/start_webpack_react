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
    ifelse = require('gulp-if-else'),
    args = require('yargs').argv;

var env = (args.env === 'production') ? 'production' : 'development',
    isProd = (args.env === 'production');


//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: "Error: <%= error.message %>"
    })
};

//style
gulp.task('compass', function () {
    gulp.src('./assets/scss/**/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(
            compass({
                css: './public/development/stylesheets',
                sass: './public/development/scss',
                image: './public/development/images',
                generated_images_path : './public/' + env + '/images',
                noCache: !isProd,
                sourcemap: !isProd
            })
        )
        .pipe(autoprefixer('last 2 version'))
        .pipe(ifelse(isProd, minifycss))
        .pipe(ifelse(isProd, function () { return rename({ suffix: '.min' }); }))
        .pipe(gulp.dest('./public/' + env + '/stylesheets'))
        .pipe(livereload());
});

//react script
gulp.task('react-scripts', function () {
    gulp.src(['app/main.js'])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify' ]
        }))
        .pipe(ifelse(
            isProd,
            uglify
        ))
        .pipe(gulp.dest('./public/' + env + '/javascripts'))
        .pipe(livereload());
});

//watch
gulp.task('watch-files', function () {
    livereload.listen();
    //watch .scss files
    gulp.watch('asstes/scss/**/*.scss', ['compass']);
    gulp.watch('app/**/*.js', ['react-scripts']);
});


gulp.task('default', ['compass', 'react-scripts']);