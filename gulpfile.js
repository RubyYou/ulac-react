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

// Configuration for Gulp
var config = {
    js: {
        src: './src/main.jsx',
        watch: './src/**/*',
        outputDir: './build/',
        outputFile: 'bundle.js',
    },
};

// Error reporting function
function mapError(err) {
    if (err.fileName) {
        // Regular error
        gutil.log(chalk.red(err.name)
            + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
            + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
            + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
            + ': ' + chalk.blue(err.description));
    } else {
        // Browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message));
    }
}

// Completes the final file outputs
function bundle(bundler) {
    var bundleTimer = duration('Javascript bundle time');

    bundler
        .bundle()
        .on('error', mapError) // Map error reporting
        .pipe(source('main.jsx')) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        .pipe(rename(config.js.outputFile)) // Rename the output file
        .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
        .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
        .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
        .pipe(notify({
            message: 'Generated file: <%= file.relative %>',
        })) // Output the file being created
        .pipe(bundleTimer); // Output time timing of the file creation
}

// Gulp task for build
gulp.task('default', function() {
    var args = merge(watchify.args, { debug: true }); // Merge in default watchify args with browserify arguments

    var bundler = browserify(config.js.src, args) // Browserify
        .plugin(watchify, {ignoreWatch: ['node_modules/**', 'bower_components/**']}) // Watchify to watch source file changes
        .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

    bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

    bundler.on('update', function() {
        return bundle(bundler); // Re-run bundle on source updates
    });
});


gulp.task('watch:browserify', function () {
    var opts = assign({}, watchify.args, {
        entries: ['./src/app.js'],
        debug: true,
        basedir: './src/',
        paths: ['./lib']
    });

    var b = watchify(browserify(opts));

    b.on('update', function () {
        bundle();
    });

    function bundle() {
        gutil.log(gutil.colors.blue("Starting Browserify..."));
        var time = Date.now();
        return b.bundle()
            .on('error', gutil.log.bind(gutil, gutil.colors.red('Browserify Error')))
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('app'))
            .on('end', function () {
                var duration = Date.now() - time;
                gutil.log(gutil.colors.blue('Finished Browserify') + " (%dms)", duration);
            })
    }

    return bundle();
});