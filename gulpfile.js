var gulp = require('gulp');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var Server = require('karma').Server;
var connect = require('gulp-connect');

var path = {
    scripts: './src/js/**/*.js',
    sass: './src/sass/**/*.scss'
}

gulp.task('webserver', function() {
  connect.server();
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('jsScripts', () =>{
	return gulp.src(path.scripts)
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/js'));
})

gulp.task('jsVendors', () =>{
	return gulp.src(mainBowerFiles())
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('dist/js'));
})

gulp.task('sass', () =>{
    return gulp.src(path.sass)
    .pipe(concat('all.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
})

// Minify
gulp.task('minifySass', () =>{
    return gulp.src('./sass/**/*.scss')
    .pipe(concat('all.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('minifyVendors', () => {
    return gulp.src(mainBowerFiles())
    .pipe(uglify())
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('dist/js'));
})

gulp.task('minifyScripts', () => {
    return gulp.src(path.scripts)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})

gulp.task('watch', () =>{
	gulp.watch('./src/js/**/*.js', ['jsScripts']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
})

gulp.task('build', ['minifyVendors', 'minifyScripts', 'minifySass']);

gulp.task('default', ['watch', 'jsScripts', 'jsVendors', 'sass', 'webserver']);


