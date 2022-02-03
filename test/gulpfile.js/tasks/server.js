const browserSync = require("browser-sync")
const { paths } = require("../config")
const connect = require("gulp-connect-php")
const webserver = require('gulp-webserver');
const serve = browserSync.create()
//php
const server = () => {
  serve.init({
    server: {
      baseDir: paths.dist
    },
  })
  // connect.server(
  //   {
  //     port: 8000,
  //     base: paths.dist,
  //     stdio: 'ignore',
  //   },
  //   () => {
  //     browserSync({
  //       proxy: "localhost:8000",
  //     })
  //   }
  // )
}

exports.server = server
