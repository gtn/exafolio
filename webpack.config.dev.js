var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-hot-middleware/client',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({debug: true})
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader?cacheDirectory=true',
			include: path.join(__dirname, 'src')
		}]
	}
};
