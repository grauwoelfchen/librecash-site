var gulp   = require('gulp')
  , bower  = require('gulp-bower')
  , cssMin = require('gulp-css')
  , concat = require('gulp-concat')
  ;

gulp.task('bower', function() {
  return bower('./vendor/components');
});

gulp.task('minify', function(){
  return gulp.src([
    'static/css/*.css',
    'vendor/components/semantic-ui/dist/semantic.min.css'
  ]).pipe(concat("app.css"))
    .pipe(cssMin())
    .pipe(gulp.dest('static/build/'));
});

gulp.task('default', ['bower', 'minify']);
