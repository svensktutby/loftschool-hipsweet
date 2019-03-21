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
  gulpIf = require('gulp-if'),
  useref = require('gulp-useref'),
  del = require('del'),
  spritesmith = require('gulp.spritesmith'),
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
gulp.task('styles', function () {
  return gulp.src('./app/scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      //outputStyle: 'compressed' //'expanded'
    })).on('error', log)
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7'],
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

/* Scripts
******************************/
gulp.task('scripts', function () {
  return gulp.src('./app/js/parts/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./app/js'))
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
      quality : [0.8, 0.9],
      speed   : 2
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

/* PNG sprite
******************************/
gulp.task('pngSprite', function() {
  var spriteData = gulp.src('./app/icons/png/*.png')
    .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite-png.scss',
    cssFormat: 'scss',
    padding: 10,
    algorithm: 'top-down',
    cssVarMap: function (sprite) {
        sprite.name = 'icon-' + sprite.name;
    },
    imgPath: '../img/sprite.png'
  }));

  spriteData.img
    .pipe(gulp.dest('./app/img'));
  spriteData.css
    .pipe(gulp.dest('./app/scss/_misc'));
  return spriteData;
});

/* SVG sprite
******************************/
gulp.task('svgSprite', function() {
  return gulp.src('./app/icons/svg/*.svg')
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
            sprite: '../../img/sprite.svg',
            render: {
              scss: {
                dest: '../../scss/_misc/_sprite-svg.scss',
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
    .pipe(gulp.dest('./app/icons'));
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
  gulp.watch('./app/scss/**/*.scss', gulp.parallel('styles'));
  gulp.watch('./app/js/parts/**/*.js', gulp.parallel('scripts'));
  gulp.watch('./app/icons/png/*.png', gulp.parallel('pngSprite'));
  gulp.watch('./app/icons/svg/*.svg', gulp.parallel('svgSprite'));
  gulp.watch('./app/**/*{html,js,scss,css}').on('change', browserSync.reload);
});

/* Prebuild
******************************/
gulp.task('prebuild', function(building) {

  const userefTask = gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cleanCss()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('./dist'));

  const fontsTask = gulp.src('./app/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'));

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
  return del.sync('./dist');
});

/* Build
******************************/
gulp.task('build', gulp.series('clean','prebuild', 'img'));

/* Default
******************************/
gulp.task('default', gulp.parallel('styles', 'scripts', 'watch', 'serve'));