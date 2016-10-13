'use strict';

// Helper: root() is defined at the bottom
let path = require('path');
let webpack = require('webpack');

// Webpack Plugins
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.npm_lifecycle_event;
let isProd = ENV === 'build';


module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  let config = {};

	/**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts' // our angular app
  };

 /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    path: root('dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

	/**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    // only discover files that have those extensions
    extensions: ['', '.ts', '.js'],
  };
  
	/**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    loaders: [
			// Support for .ts files.
      {test: /\.ts$/, loader: 'ts-loader'}
		]
	};

	/**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

		// Workaround needed for angular 2 angular/angular#11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			root('./src') // location of your src
		),

		// Generate common chunks if necessary
		// Reference: https://webpack.github.io/docs/code-splitting.html
		// Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
		new CommonsChunkPlugin({
			name: ['vendor', 'polyfills']
		}),

		// Inject script and link tags into html files
		// Reference: https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			template: './src/index.html',
			chunksSortMode: 'dependency'
		})
	]

	return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}