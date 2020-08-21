/**
 * HMR 热模块更新
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// optimize-css-assets-webpack-plugin
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const workboxWebpackPlugin = require('workbox-webpack-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = 'production';

// 复用一下loader
const commonCssLoader = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			plugins: () => [
				// 帮助postcss找到browserslist里面的配置，通过配置指定加载css的兼容样式
				require('postcss-preset-env')()
			]
		}
	}
];

/**
 * 缓存
 * babel 缓存
 *  cacheDirectory:true
 * 	可以让第二次打包速度更快
 * 文件资源缓存
 * 	hash:每次webpack构建都会生成唯一的hash值
 * 			问题在于js和css同时使用一个hash值，如果重新打包，会导致所有的缓存都失效（有可能我只改动了一个文件）
 * 	chunkhash:相同chunk下的文件，hash值是一样的
 * 	contenthash: 根据文件内容生成不同的hash
 */

/** 
	* tree shaking 较少代码体积，去除没有应用的代码
		1.需要es6 modules 2."production"
		在package.json "sideEffect":false 所有代码都没有副作用。都可以进行tree-shaking,但是这样的话，在某些版本中可能会把 css 文件去除掉
		处理之后 "sideEffects": [	"*.css" ]
 */

/**
 * PWA 渐进式网络开发应用程序
 * workbox-webpack-plugin
 */

module.exports = {
	mode: 'production',

	entry: './src/main.js',

	output: {
		filename: 'js/[name].[hash:10].js',
		path: resolve(__dirname, 'build')
	},
	// loader
	module: {
		rules: [
			// 一旦使用oneof,将不会对文件进行多处理
			{
				oneOf: [
					{
						test: /\.css$/,
						// css-loader 将css文件变成common.js模块加载进入js中，里面内容是样式字符串
						// style-loader 创建style标签，将js中的样式资源插入head标签中
						// 执行顺序是从右向左，从下到上，css-loader -> style-loader
						// use: ['style-loader', 'css-loader']
						// MiniCssExtractPlugin.loader 取代 style-loader 提取js中的css文件
						// 兼容性处理 postcss-loader postcss-preset-env
						use: [...commonCssLoader]
					},
					{
						test: /\.less$/,
						use: [...commonCssLoader, 'less-loader']
					},
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage',
										corejs: {
											version: 3
										},
										targets: {
											chrome: '60'
										}
									}
								]
							],
							// 开启babel缓存
							cacheDirectory: true
						}
					},
					{
						test: /\.(jpe?g|png|gif|svg)$/,
						// url-loader 依赖于 file-loader
						loader: 'url-loader',
						options: {
							limit: 8 * 1024,
							// 关闭url-loader的es6模块，使用common.js进行解析
							esModule: false,
							// 取图片hash值的前10位，ext为原拓展名
							name: '[hash:10].[ext]',
							outputPath: 'images'
						}
					},
					{
						test: /\.html$/,
						// 用来处理html里面图片的问题，负责引入img，从而能够被url-loader进行处理
						loader: 'html-loader'
					},
					{
						// 排除这些资源别的资源
						exclude: /\.(js|css|html|less|jpg|jpeg|png|gif|svg)/,
						// test: /\.svg$/,
						loader: 'file-loader'
					}
					// {
					// 	test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
					// 	loader: 'url-loader',
					// 	options: {
					// 		limit: 10000
					// 	}
					// }
				]
			}
		]
	},
	plugins: [
		// 默认创建一个空的html，自动引入打包的所有资源
		new HtmlWebpackPlugin({
			// 复制 './src/index.html',自动引入打包的所有资源
			template: './src/index.html',
			minify: {
				// 移除空格
				collapseWhitespace: true,
				// 移除注释
				removeComments: true
			}
		}),
		new MiniCssExtractPlugin({
			// 输出重命名
			filename: 'css/built.[hash:10].css'
		}),
		new optimizeCssAssetsWebpackPlugin(),
		new workboxWebpackPlugin.GenerateSW({
			/** 快速启动 serviceWorker并删除旧的serviceWorker */
			clientsClaim: true,
			skipWaiting: true
		}),
		// 告诉webpack哪些是不用参与打包
		new webpack.DllReferencePlugin({
			manifest: resolve(__dirname, 'dll/manifest.json')
		}),
		// 将某个文件打包出去，并在html中自动引入该资源
		new addAssetHtmlWebpackPlugin({
			filepath: resolve(__dirname, 'dll/jquery.js')
		})
	],
	// 只会在内存中编译打包，不会有任何输出
	devServer: {
		contentBase: resolve(__dirname, 'build'),
		// 启动 gzip 压缩
		compress: true,
		port: 3000,
		open: false,
		hot: true
	},
	/**
	 * 开发环境 速度快。调试更友好 可以 eval-source-map
	 * 生产环境：源代码要不要隐藏？调试要不要更友好 no-resource-map source-map
	 */
	devtool: 'source-map',
	/**
	 * 把 node_modules 里面的代码单独进行打包了，形成一个chunk最终输出
	 * 有公共依赖打包成为一个chunk
	 */
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	// 一些忽略的库--npm 包
	externals: {
		jquery: 'jQuery'
	}
};
