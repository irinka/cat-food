const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

var plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.pug'
  }),
  new ExtractTextPlugin({
    filename: 'application.css',
    allChunks: true,
    disable: process.env.NODE_ENV !== 'production'
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin());
};


module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'application.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                  plugins: [
                      autoprefixer({
                          browsers:['ie >= 8', 'last 4 version']
                      })
                  ],
                  sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
        })
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
    ]
  },
  plugins: plugins,
  devServer: {
    contentBase: './src',
    inline: true,
    port: 3000
  },
};
