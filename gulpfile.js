var gulp   = require('gulp')
  , bower  = require('gulp-bower')
  , cssMin = require('gulp-css')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  ;

gulp.task('bower', function() {
  return bower('./vendor/components');
});

gulp.task('minify-css', function() {
  return gulp.src([
    'vendor/components/semantic-ui/dist/semantic.min.css'
  , 'static/css/*.css'
  ]).pipe(concat("app.css"))
    .pipe(cssMin())
    .pipe(gulp.dest('static/build/'));
});

gulp.task('minify-js', function() {
  return gulp.src([
    'vendor/components/jquery/dist/jquery.min.js'
  , 'vendor/components/semantic-ui/dist/semantic.min.js'
  , 'static/js/*.js'
  ]).pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest('static/build/'));
});

gulp.task('default', ['bower', 'minify-css', 'minify-js']);
