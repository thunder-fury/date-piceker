const { src, dest, series } = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const { paths } = require('../config');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();


const jsBuild = () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(dest(`${paths.public}js`))
};

const scssBuild = () => {
  return src( paths.css_src )
      .pipe( $.sourcemaps.init())
      .pipe( $.sass())
      .pipe( $.postcss([ autoprefixer(), cssnano() ]))
      .pipe( $.sourcemaps.write('.'))
      .pipe( dest( `${paths.public}css` )
  );

}

const pugBuild = (cb) => {
  return src([paths.pug_src, paths.pug_exclude])
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
    .pipe(dest(`${paths.public}`))
  cb();
};




exports.jsBuild = jsBuild
// exports.imageminBuild = imageminBuild;
exports.pugBuild = pugBuild;
exports.scssBuild = scssBuild
// exports.copyimgBuild = copyimgBuild;
// exports.svgminBuild = svgminBuild;
// exports.phpBuild = phpBuild;
// exports.envBuild = envBuild;
// exports.fontBuild = fontBuild;
exports.build = series(jsBuild, pugBuild, scssBuild);