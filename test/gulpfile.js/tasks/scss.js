const { src, dest } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { paths } = require('../config');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
//scss task
const scss = () => {
    return src( paths.css_src )
        .pipe( $.sourcemaps.init())
        .pipe( $.sass())
        .pipe( $.postcss([ autoprefixer(), cssnano() ]))
        .pipe( $.sourcemaps.write('.'))
        .pipe( dest( paths.css_dist )
    );
 
}
exports.scss = scss