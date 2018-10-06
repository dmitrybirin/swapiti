const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const webpackConfig = {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
	],
}

module.exports = !isProduction
	? webpackConfig
	: {
			...webpackConfig,
			...{
				plugins: [...webpackConfig.plugins, new webpack.HotModuleReplacementPlugin()],
				devServer: {
					contentBase: './dist',
					hot: true,
				},
			},
	  }
