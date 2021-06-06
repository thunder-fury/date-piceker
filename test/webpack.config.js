module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { modules: false }]],
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  cache: true,
};
