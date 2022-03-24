const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: { bundle: ['./src/index.js'] },
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'postcss-loader'
				]
			}
		]
	},
	devServer: {
		port: 8081
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'resume',
			filename: 'remoteEntry.js',
			remotes: {},
			exposes: {
				'./Resume': './src/routes/index.svelte'
			},
			shared: require('./package.json').dependencies
		}),
		new MiniCssExtractPlugin({
			filename: './src/resume.css'
		}),
		new HtmlWebPackPlugin({
			template: './src/app.html'
		})
	],
	devtool: prod ? false : 'source-map'
};
