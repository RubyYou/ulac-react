'use strict';

var gulp = require('gulp');  // Base gulp package
var babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
var browserify = require('browserify'); // Providers "require" support, CommonJS
var notify = require('gulp-notify'); // Provides notification to both the console and Growel
var rename = require('gulp-rename'); // Rename sources
var sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
var livereload = require('gulp-livereload'); // Livereload support for the browser
var gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep
var chalk = require('chalk'); // Allows for coloring for logging
var source = require('vinyl-source-stream'); // Vinyl stream support
var buffer = require('vinyl-buffer'); // Vinyl stream support
var watchify = require('watchify'); // Watchify for source changes
var merge = require('utils-merge'); // Object merge tool
var duration = require('gulp-duration'); // Time aspects of your gulp process
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');

// Configuration for Gulp
var config = {
    js: {
        src: './src/main.jsx',
        watch: './src/**/*',
        outputDir: './build/',
        outputFile: 'bundle.js',
    }
};

gulp.task('compass', function() {
  gulp.src('./src/sass/*.scss')
              .pipe(compass({
                // Gulp-compass options and paths
                css: 'css',
                sass: './src/sass/',
                require: ['susy']
         }))
         .pipe(minifyCSS())
         .pipe(gulp.dest('./build/css/'));;
});

// gulp.task('sass', function() {
//   gulp.src('src/sass/**/*.{scss,sass}')
//     // Initializes sourcemaps
//     .pipe(sourcemaps.init())
//     .pipe(sass({
//       errLogToConsole: true
//       }))
//     // Writes sourcemaps into the CSS file
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./css'));
// })


// Gulp task for build
gulp.task('default', function() {
    var args = merge(watchify.args, { debug: false }); // Merge in default watchify args with browserify arguments

    var bundler = browserify(config.js.src, args) // Browserify
        .plugin(watchify, {ignoreWatch: ['node_modules/**', 'react/**']}) // Watchify to watch source file changes
        .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

    bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

    bundler.on('update', function() {
        return bundle(bundler); // Re-run bundle on source updates
    });
});

// Completes the final file outputs
function bundle(bundler) {
    var bundleTimer = duration('Javascript bundle time');

    bundler
        .bundle()
        .pipe(source('main.jsx')) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        .pipe(rename(config.js.outputFile)) // Rename the output file
        //.pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
        //.pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
        .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
        .pipe(notify({
            message: 'Generated file: <%= file.relative %>',
        })) // Output the file being created
        .pipe(bundleTimer); // Output time timing of the file creation
}