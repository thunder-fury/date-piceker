const { dest } = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const browserSync = require('browser-sync');
const { paths } = require('../config');

const js = () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(dest(paths.js_dist))
    .pipe(browserSync.stream());
};

exports.js = js;
