var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var swig        = require('gulp-swig');
var frontMatter = require('gulp-front-matter');
var reload      = browserSync.reload;

var src = {
    scss: 'app/scss/*.scss',
    html: 'app/**/*.html',
    partials: '!app/partials/*.html'
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
    gulp.watch(src.html, ['html']);
});

// Swig templates
gulp.task('html', function(){
    gulp.src([src.html, src.partials])
    .pipe(frontMatter({ property: 'data' }))
    .pipe(swig({ 
      defaults: { cache: false } 
     }))
    .pipe(gulp.dest(dist.html))
    .pipe(reload({stream:true}));
});


gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
