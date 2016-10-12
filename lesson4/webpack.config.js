'use strict';

let result = (function() {

  let HtmlWebpackPlugin = require('html-webpack-plugin');

  let entry = './src/main.ts';
  let output = './dist';

  const config = {
      entry: entry,
      output: {
          path: output,
          filename: "main.bundle.js"
      },
      module: {
          loaders: [
              {test: /\.ts$/, loader: 'ts-loader'}
          ]
      },
    resolve: {
      extensions: ['', '.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
  };
  return config;
})();

module.exports = result;