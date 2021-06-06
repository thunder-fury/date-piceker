import webpack from 'webpack'

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: `${__dirname}/dist/js`,
		filename: 'app.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			comments:false
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['env', {'modules': false}]
							]
						}
					}
				]
			}
		]
	}
};
