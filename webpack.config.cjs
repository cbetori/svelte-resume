const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

console.log(mode);
module.exports = {
	entry: { bundle: ['./src/index.js'] },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: 'https://svelte-resume-5s8vck6r0-cbetori.vercel.app/'
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
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		]
	},
	mode: 'development',
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
		new HtmlWebPackPlugin({
			template: './src/app.html'
		})
	]
};
