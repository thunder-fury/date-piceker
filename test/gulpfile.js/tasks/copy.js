// Initialize modules
const { src, dest, series } = require('gulp');
//File path variables
const { paths } = require('../config');

const jsCopy = ( cb ) => {
  return src('../dist/*.js')
  .pipe(dest('./src/js/cerrent'));
  cb();
}
const ccssCopy = ( cb ) => {
  return src('./dist/css/*')
  .pipe(dest('../dist/css'))
  cb();
}

exports.jsCopy = jsCopy;
exports.ccssCopy = ccssCopy;
exports.copy = series(jsCopy,ccssCopy);