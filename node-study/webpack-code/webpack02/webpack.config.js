const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: resolve(__dirname, './src/main.js'),
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	plugins: [new HtmlWebpackPlugin()]
};
