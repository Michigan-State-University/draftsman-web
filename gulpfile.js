var gulp = require('gulp');

// gulp.task('fonts', function(){
//   return gulp.src('client/templates/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('build/html'))
// });

gulp.task('js', function(){
  return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('js'))
});

gulp.task('css', function(){
  return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest('css'))
});

gulp.task('font', function(){
  return gulp.src(['bower_components/bootstrap/dist/fonts/*'])
    .pipe(gulp.dest('fonts'))
});

gulp.task('default', [ 'js', 'css', 'font' ]);
