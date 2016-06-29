/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    cleanCSS = require('gulp-clean-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    bower = require('gulp-bower'),
    livereload = require('gulp-livereload');

/**
 * web assets path locations
 **/
var paths = {
    src: {
        scripts: 'src/js/**/*.*',
        styles: 'src/css/**/*.*',
        images: 'src/img/**/*.*',
        templates: 'src/templates/**/*.html',
        index: 'src/index.html',
        bower_fonts: 'src/fonts/*.{ttf,woff,eof,svg}',
        bootstrap_fonts: 'build/lib/bootstrap/fonts/*.{ttf,woff,eof,svg}',
        sample_json_data: 'src/data/**/*.json'
    },
    dest: 'build'
 };


/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.src.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [cleanCSS({compatibility: 'ie8'}), 'concat']
        }))
        .pipe(gulp.dest(paths.dest+'/'));
});

/**
 * install bower components on the app directory
 **/
gulp.task('bower-install', function() {
      return bower()
           .pipe(gulp.dest(paths.dest+'/lib'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts','copy-bootrap_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.src.bower_fonts)
        .pipe(gulp.dest(paths.dest+'/fonts'));
});

gulp.task('copy-bootrap_fonts', function() {
    return gulp.src(paths.src.bootstrap_fonts)
        .pipe(gulp.dest(paths.dest+'/fonts'));
});

//copy sample json data
gulp.task('copy-sample-data', function() {
    return gulp.src(paths.src.sample_json_data)
        .pipe(gulp.dest(paths.dest+'/data'));
});
/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.src.images)
        .pipe(gulp.dest(paths.dest +'/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.src.scripts)
        .pipe(minifyJs())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.dest +'/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.src.styles)
        .pipe(gulp.dest(paths.dest +'/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.src.templates)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dest +'/templates'));
});


/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.src.images], ['custom-images','livereload']);
    gulp.watch([paths.src.styles], ['custom-less','livereload']);
    gulp.watch([paths.src.scripts], ['custom-js','livereload']);
    gulp.watch([paths.src.templates], ['custom-templates','livereload']);
    gulp.watch([paths.src.index], ['usemin','livereload']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: paths.dest,
        livereload: true,
        port: 8888
    });
    
});

gulp.task('livereload', function() {
    gulp.src([paths.dest +'/**/*.*'])
     //.pipe(watch())
     .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'webserver',  'watch']);
gulp.task('bower', ['bower-install']);
gulp.task('sample',['copy-sample-data']);