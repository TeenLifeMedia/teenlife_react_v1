const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const cssnano = require('cssnano')

const PATHS = {
	app: path.join(__dirname, 'src'),
	build: path.join(__dirname, `build-${process.env.NODE_ENV}`),
}

const production = merge([
	{
		output: {
			path: PATHS.build,
			chunkFilename: 'static/js/[name].[chunkhash:8].js',
			filename: 'static/js/[name].[chunkhash:8].chunk.js',
			publicPath: '/',
		},
		plugins: [
			new OptimizeCSSAssetsPlugin({
				cssProcessor: cssnano,
				cssProcessorOptions: { safe: true },
				canPrint: false,
			}),
			// new CleanWebpackPlugin(PATHS.build),
		],
	},
	{
		optimization: {
			splitChunks: {
				chunks: 'initial',
			},
			runtimeChunk: {
				name: 'manifest',
			},
			minimizer: [new TerserPlugin()],
		},
	},
])

const development = merge([
	{
		devServer: {
			host: process.env.HOST || '0.0.0.0',
			port: process.env.PORT || 3030,
			publicPath: '/',
			public: 'local.teenlife.com',
			stats: 'errors-only',
			overlay: true,
			historyApiFallback: {
				index: '/',
			},
			https: false,
			contentBase: './dist',
			watchContentBase: true,
			hot: true,
			inline: true,
		},
	},
	{
		plugins: [new webpack.HotModuleReplacementPlugin()],
	},
	{
		output: {
			publicPath: '/',
			filename: 'static/js/bundle.js',
			path: path.join(__dirname, 'dist'),
		},
	},
])

const envs = {
	production,
	development,
}

const buildEnvironmentVariables = (envVars) =>
	Object.entries(envVars).reduce(
		(acc, [key, value]) => ({ ...acc, [`config.${key}`]: JSON.stringify(value) }),
		{},
	)

module.exports = (mode) => {
	const envPath = path.join(__dirname, `.env.${process.env.NODE_ENV}`)
	const envVars = dotenv.config({ path: envPath }).parsed
	const common = merge([
		{
			resolve: {
				modules: [__dirname, 'node_modules'],
				alias: {
					constants: 'src/constants',
					components: 'src/components',
					hooks: 'src/hooks',
					utils: 'src/utils',
					pages: 'src/pages',
					contexts: 'src/contexts',
					hocs: 'src/hocs',
				},
			},
			entry: ['@babel/polyfill', PATHS.app],
			module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									modules: { localIdentName: '[local]---[hash:base64:5]', },
									importLoaders: 1
								},
							},
							'postcss-loader',
						],
					},
					{
						test: /\.js$/,
						use: 'babel-loader',
						exclude: /node_modules/,
						include: PATHS.app,
					},
					{
						test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
						loader: 'file-loader',
					},
				],
			},
			plugins: [
				new HtmlWebpackPlugin({
					title: 'Teenlife',
					template: path.join(__dirname, 'public/index.html'),
					...envVars,
				}),
				new InlineManifestWebpackPlugin('manifest'),
				new webpack.DefinePlugin(buildEnvironmentVariables(envVars)),
				new MiniCssExtractPlugin({
					filename: 'static/css/[name].[contenthash:4].css',
				}),
			],
		},
	])

	return merge(common, envs[mode], { mode })
}