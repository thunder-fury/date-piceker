const browserSync = require("browser-sync")
const { paths } = require("../config")
const connect = require("gulp-connect-php")

//php
const server = () => {
  connect.server(
    {
      port: 8000,
      base: paths.dist,
    },
    () => {
      browserSync({
        proxy: "localhost:8000",
      })
    }
  )
}

exports.server = server
