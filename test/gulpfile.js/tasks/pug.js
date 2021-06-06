const { src, dest } = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const cached = require('gulp-cached');
const filter = require('gulp-filter');
const gulpif = require('gulp-if');
const { paths } = require('../config');
// const minimist = require('minimist');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();


const pugOption = {
  verString: new Date().getTime(),
};

const pug = () => {
  return src([paths.pug_src, paths.pug_exclude])
    .pipe(plumber())
    .pipe(gulpif(global.isWatching, cached('pug')))
    .pipe(
      filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      }),
    )
    .pipe(
      $.pug({
        pretty: true,
        // locals: pugOption,
      }),
    )
    .pipe(
      $.rename({
        extname: '.html',
      }),
    )
    .on('error', (err) => {
      console.log(err.message);
    })
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

exports.pug = pug;
