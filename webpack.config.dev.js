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
	devServer: {
		port: 3000,
		historyApiFallback: true,
		inline: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		// add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
		modules: ['src', 'node_modules'],
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loaders: ['babel-loader?cacheDirectory=true', 'ts-loader?allowJsEntry=true'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.jsx?$/,
			loaders: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		}]
	}
};

/*
module.exports = {
	devtool: 'eval',
	entry: {
		main: [
			'webpack-hot-middleware/client',
			'./src/index'
		],
		vendor: ['react', 'react-dom', 'react-redux']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[hash].[name].js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'] // Specify the common bundle's name.
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
		// new webpack.LoaderOptionsPlugin({debug: true})
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader?cacheDirectory=true',
			include: path.join(__dirname, 'src')
		}]
	}
};
*/