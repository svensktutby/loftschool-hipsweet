/* jshint esnext: true */

/* GULP CONFIGURATION
============================== */
const gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  mozjpeg = require('imagemin-mozjpeg'),
  cache = require('gulp-cache'),
  browserSync = require('browser-sync').create();

/* SVG SPRITE CONFIGURATION
============================== */
const svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

/* Styles
******************************/
gulp.task('mainStyles', function () {
  return gulp.src('./app/scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      //outputStyle: 'compressed' //'expanded'
    })).on('error', log)
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

var log = function(error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
};

gulp.task('vendorStyles', function () {
  return gulp.src('./app/css/vendor/*.css')
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

/* Scripts
******************************/
gulp.task('scripts', function () {
  return gulp.src('./app/js/parts/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('./app/js'))
    .pipe(browserSync.stream());
});

/* HTML
******************************/
gulp.task('html', function () {
  return gulp.src('./app/*.html')
    .pipe(browserSync.stream());
});

/* Images
******************************/
gulp.task('img', function () {
  return gulp.src('./app/img/**/*')
    .pipe(cache(imagemin( // With caching
    // .pipe(imagemin( // Compressing images without caching
    [
      pngquant({
      quality : [0.7, 0.9],
      speed   : 1
      }),
      mozjpeg({
        progressive : true,
        quality     : 80,
        quantTable  : 2
      })
      // ,imagemin.svgo({
      //   plugins: [{removeViewBox: false}]
      // })
    ],{
      verbose: true
    })))
    .pipe(gulp.dest('dist/img'));
});

/* SVG sprite
******************************/
gulp.task('svgSpriteBuild', function() {
  return gulp.src('./app/icons/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
          symbol: {
            sprite: "../sprite.svg",
            render: {
              scss: {
                dest: '../../../scss/_misc/_sprite.scss',
                template: './app/scss/templates/_sprite_template.scss'
              }
            },
            example: {
              dest: '../tmp/spriteSvgDemo.html'
            }
          }
        }
      }
    ))
    .pipe(gulp.dest('./app/icons/sprite'));
});

/* Browser sync
******************************/
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './app'
    },
    notify: false
  });
});

/* Watchers
******************************/
gulp.task('watch', function () {
  gulp.watch('./app/scss/**/*.scss', gulp.parallel('mainStyles'));
  gulp.watch('./app/css/vendor/*.css', gulp.parallel('vendorStyles'));
  gulp.watch('./app/js/parts/**/*.js', gulp.parallel('scripts'));
  gulp.watch('./app/*.html', gulp.parallel('html'));
  gulp.watch('./app/**/*{html,js,scss,css}').on('change', browserSync.reload);
});

/* Prebuild
******************************/
gulp.task('prebuild', function(building) {

  const buildMainCss = gulp.src('./app/css/style.min.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('./dist/css'));

  const buildVendorCss = gulp.src('./app/css/vendor.min.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('./dist/css'));

  const buildJs = gulp.src('./app/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));

  const buildFonts = gulp.src('./app/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'));

  const buildHtml = gulp.src('./app/*.html')
  .pipe(gulp.dest('./dist'));

  const buildSvg = gulp.src('./app/icons/sprite/sprite.svg')
  .pipe(gulp.dest('./dist/icons/sprite'));

  building();
});

/* Clear cache
******************************/
gulp.task('clear', function () {
  return cache.clearAll();
});

/* Clean
******************************/
gulp.task('clean', function(cleaning) {
  cleaning();
  return del.sync('./dist/');
});

/* Build
******************************/
gulp.task('build', gulp.series('clean','prebuild', 'img'));

/* Default
******************************/
gulp.task('default', gulp.parallel('html', 'mainStyles', 'vendorStyles', 'scripts', 'watch', 'serve'));