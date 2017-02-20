var path = require('path');
var webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: 'nosources-source-map', // 'nosources-source-map', // 'eval-source-map',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
				'BABEL_ENV': JSON.stringify('production')
			}
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			},
			sourceMap: true
		}),
		//new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"'], onBuildExit:['echo "exit"']})
		new WebpackShellPlugin({onBuildEnd: ['cp index.dist.html dist/index.html']})
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			loaders: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			})
			// ohne css in seperates file extrahieren:
			/*
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
			*/
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
