const { src, dest, watch, series, parallel } = require("gulp");

const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

// CSS Task
function cssTask() {
  return src("style.css")
    .pipe(cssnano())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

// JS Task
function jsTask() {
  return src("script.js")
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

// HTML Task
function htmlTask() {
  return src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

// Image Task
function imageTask() {
  return src("pics/**/*")
    .pipe(imagemin())
    .pipe(dest("dist/pics"));
}

// Copy temple folder
function templeTask() {
  return src("temple/**/*")
    .pipe(dest("dist/temple"));
}

// Live Server
function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  watch("*.html", htmlTask);
  watch("style.css", cssTask);
  watch("script.js", jsTask);
}

// Default Task
exports.default = series(
  parallel(cssTask, jsTask, htmlTask, imageTask, templeTask),
  serve
);