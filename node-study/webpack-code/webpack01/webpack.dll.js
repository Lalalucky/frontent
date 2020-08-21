const { resolve } = require('path');
const webpack = require('webpack');

// 对第三方的库进行打包，比如jquery，react
// webpack --config webpack.dll.js
module.exports = {
	mode: 'production',
	entry: {
		jquery: ['jquery']
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dll'),
		library: '[name]_[hash]'
	},
	plugins: [
		// 打包生成一个 manifest.json 提供和jquery的映射关系
		new webpack.DllPlugin({
			name: '[name]_[hash]', // 暴露的内容
			path: resolve(__dirname, 'dll/manifest.json')
		})
	]
};
