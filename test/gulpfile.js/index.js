const { watch, series, parallel } = require('gulp');
const { pug } = require('./tasks/pug');
const { scss } = require('./tasks/scss');
const { copy } = require('./tasks/copy');
const { js } = require('./tasks/webpack');
const { server } = require('./tasks/server');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');
const { paths } = require('./config');
const watchTask = () => {
  connect.server(
    {
      port: 8001,
      base: paths.dist,
    },
    () => {
      browserSync({
        proxy: 'localhost:8001',
      });
    },
  );
  const browserReload = () => {
    browserSync.reload();
  };
  watch(
    ['src/scss/**/*', 'src/js/**/*', 'src/pug/**/*', '../dist/index.js'],
    parallel(pug, scss, js, copy),
  ).on('change', series(browserReload));
};
exports.default = series(parallel(pug, scss, js, copy), watchTask);
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.server = server;
exports.watchTask = watchTask;
exports.copy = copy;
