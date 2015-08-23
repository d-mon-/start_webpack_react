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

//path for compass
var base_dir   = path.join(__dirname, 'public', 'development'),
    scss_dir   = path.join(base_dir, 'scss'),
    js_dir     = path.join(base_dir, 'javascript'),
    style_dir  = path.join(base_dir, 'stylesheets'),
    img_dir    = path.join(base_dir, 'images'),
    sprite_dir = path.join(base_dir, 'images-sprite');

var scss_files   = path.join(scss_dir, '*.scss'),
    js_files     = path.join(js_dir, '*.js'),
    css_files    = path.join(style_dir, '*.css'),
    sprite_files = path.join(sprite_dir,  '*.*');

//environment variables
var env = (args.env === 'production') ? 'production' : 'development',
    isProd = (args.env === 'production');


//plumber's notification setting
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: "Error: <%= error.message %>"
    })
};

//generate css from scss files with compass
gulp.task('compass', function () {
    gulp.src(scss_files)
        .pipe(plumber(plumberErrorHandler))
        .pipe(
            compass({
                css: style_dir,
                sass: scss_dir,
                image: img_dir,
                generated_images_path : sprite_dir,
                sourcemap: true
            })
        )
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(style_dir))
        .pipe(livereload());
});

//copy dev files to production
gulp.task('copyFilesToProd', function () {
    gulp.src([js_files, css_files, sprite_files], {base: base_dir})
        .pipe(gulp.dest('./public/production/'));
});


//generate client-bundle of react files
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

//watch scss and react files
gulp.task('watch-files', function () {
    livereload.listen();
    //watch .scss files
    gulp.watch(scss_files, ['compass']);
    gulp.watch('app/**/*.js', ['react-scripts']);
});

//default task
gulp.task('default', ['compass', 'copyFilesToProd', 'react-scripts']);