const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  entry: { main: './index.jsx' },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Src: path.resolve(__dirname, './src/'),
    },
  },
  devServer: {
    watchFiles: './src',
    hot: true,
    compress: true,
    port: 3030,
    open: true,
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'jsx'] }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|svg|gif|webp)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.mode = 'production';
    config.optimization = {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          parallel: true,
        }),
      ],
    };
    config.output.filename = '[contenthash].js';
  } else {
    config.mode = 'development';
  }
  return config;
};
