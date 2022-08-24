const { src, dest, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const paths = {
  html: 'src/*.html',
  js: 'src/js/**/*.js',
  scss: 'src/scss/**/*.scss',
  fonts: 'src/fonts/*',
  svg: 'src/images/svg/**/*.svg',
  images: [
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg'
  ],
};
const OUTPUT_DIR = 'public';

function buildHtml() {
  return src(paths.html)
    .pipe(dest(OUTPUT_DIR));
}

function fonts() {
  return src(paths.fonts)
    .pipe(dest(`${OUTPUT_DIR}/fonts`));
}

function buildStyles() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(dest(OUTPUT_DIR))
    .pipe(browserSync.stream());
}

function buildScripts() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest(OUTPUT_DIR))
    .pipe(browserSync.stream());
};

function buildSvgSprite() {
  return src(paths.svg)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${OUTPUT_DIR}/images`));
}

function compessImages() {
  return src(paths.images)
    .pipe(imageMin())
    .pipe(webp())
    .pipe(dest(`${OUTPUT_DIR}/images`));
}

function cleanDist() {
  return src(`${OUTPUT_DIR}/*`)
    .pipe(clean());
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: OUTPUT_DIR
    }
  })
};

watch(paths.html, buildHtml);
watch(paths.scss, buildStyles);
watch(paths.svg, buildSvgSprite);
watch(paths.js, buildScripts);

exports.fonts = fonts;
exports.clean = cleanDist;
exports.svg = buildSvgSprite;
exports.images = compessImages;
exports.styles = buildStyles;
exports.scripts = buildScripts;
exports.default = series( cleanDist, fonts, buildHtml, buildStyles, buildScripts, buildSvgSprite, compessImages, watchFiles);
