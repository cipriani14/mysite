'use strict';

const $ = require('gulp-load-plugins')();
const browser = require('browser-sync');
const gulp = require('gulp');
const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from config.yml
const {PATHS} = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Delete the "release" folder
// This happens every time a build starts
function clean(done) {
  rimraf('release', done);
}

gulp.task('sass:style',
  function () {
    return gulp.src(PATHS.sass)
      .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
      .pipe(
        sass(
          {
            importPath: PATHS.primer.sass,
            outputStyle: 'expanded'
          }
        )
      )
      .pipe($.autoprefixer())
      .pipe($.if(PRODUCTION, $.cssnano()))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .pipe(gulp.dest(PATHS.css));
  }
);

// Compiles Sass files into CSS
gulp.task('styles', gulp.series('sass:style'));

gulp.task('javascript:custom',
  function () {
    return gulp.src(PATHS.js.src)
      .pipe($.sourcemaps.init())
      .pipe($.concat('app.js'))
      .pipe(gulp.dest(PATHS.js.dest))
      .pipe($.if(PRODUCTION, $.uglify({'mangle': false})))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .pipe(gulp.dest(PATHS.js.dest))
  }
);

// Compiles JavaScript into a single file
gulp.task('javascript', gulp.series('javascript:custom'));

// Optimize images, move into assets directory
gulp.task('images:optimize',
  function () {
    return gulp.src(PATHS.images.src)
      .pipe($.imagemin())
      .pipe(gulp.dest(PATHS.images.dest))
  }
);

gulp.task('copy:release', function () {
    return gulp.src(
      [
        '**/*',
        '!.*',
        '!README.md',
        '!config.yml',
        '!gulpfile.js',
        '!package.json',
        '!yarn.lock',
        '!release',
        '!release/**/*',
        '!node_modules',
        '!node_modules/**/*',
        '!assets/img/src',
        '!assets/img/src/**/*'
      ]
    )
      .pipe(gulp.dest('release'))
  }
);

// Browser-Sync watch files and inject changes
gulp.task('browsersync', function () {

  // Watch these files
  var files = [
    PATHS.html,
  ];

  browser.init(files, {
    server: true
  });

  watch();

});

// Watch for changes to assets and php files.
function watch() {
  gulp.watch(PATHS.sass).on('all', gulp.series(gulp.parallel('styles'), browser.reload));
  gulp.watch(PATHS.js.src).on('all', gulp.series('javascript', browser.reload));
  gulp.watch(PATHS.html).on('all', gulp.series(browser.reload));
}

// Clean directory and build the assets
gulp.task('default', gulp.parallel('styles', 'javascript', 'images:optimize'));

// Clean the directory, build the assets, and watch for file changes
gulp.task('watch', gulp.series('default', watch));

// Build the assets, run the server, and watch for file changes
gulp.task('server', gulp.series('default', 'browsersync', watch));

// Build project and copy to clean directory
gulp.task('release', gulp.series(clean, 'default', 'copy:release'));

// Initial build of the project
gulp.task('init', gulp.series('default'));
