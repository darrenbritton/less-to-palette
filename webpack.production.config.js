const webpack = require('webpack');

const settings = {
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "./src/index.js"
    ]
  },
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: __dirname
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ["es2015", { modules: false }],
            "stage-2",
            "react"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
};

module.exports = settings;
