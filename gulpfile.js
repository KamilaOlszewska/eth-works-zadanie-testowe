var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("watch", function(cb) {
    gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
    cb();
});

gulp.task("serve", function(cb) {
    browserSync.init({
        server: "./src",
        index: "index.html"
    });
    gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/js/*.js").on("change", browserSync.reload);
    cb();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
    return gulp
        .src("src/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.init())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 4 versions"]
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task("default", gulp.series("serve"));
var gulp   = require('gulp');
var deploy = require('gulp-gh-pages');

gulp.task('deploy', function () {
    return gulp.src("./prod/**/*")
        .pipe(deploy({
            remoteUrl: "https://github.com/KamilaOlszewska/eth-works-zadanie-testowe",
            branch: "master"
        }))
});