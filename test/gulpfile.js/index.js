const { watch, series, parallel } = require('gulp');
const { pug } = require('./tasks/pug');
const { scss } = require('./tasks/scss');
const { copy } = require('./tasks/copy');
const { js } = require('./tasks/webpack');
const { server } = require('./tasks/server');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');
const { paths } = require('./config');
const { build } = require('./tasks/build');
const serve = browserSync.create();

const watchTask = () => {
  serve.init({
    server: {
      baseDir: paths.dist
    }
  })
  watch(
    ['src/scss/**/*', 'src/js/**/*', 'src/pug/**/*'],
    parallel(pug, scss, js),
  ).on('change', serve.reload);
};
exports.default = series(parallel(pug, scss, js, copy), watchTask);
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.server = server;
exports.watchTask = watchTask;
exports.copy = copy;

exports.build = build;
