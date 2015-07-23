var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var swig        = require('gulp-swig');
var frontMatter = require('gulp-front-matter');
var reload      = browserSync.reload;

var src = {
    scss: 'app/scss/*.scss',
    html: 'app/*.html'
};

var dist = {
    css:  'dist/css',
    html: 'dist'
};


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: "./dist"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html, ['templates']);
});

// Swig templates
gulp.task('templates', function() {
  gulp.src(src.html)
      .pipe(frontMatter({ property: 'data' }))
      .pipe(swig())
      .pipe(gulp.dest(dist.html))
      .on("end", reload);
});

gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
