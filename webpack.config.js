const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    theme: './src/theme.ts',
    // 'list-collections': './src/list-collections.ts',
    // collection: './src/collection.ts',
    // product: './src/product.ts',
    // cart: './src/cart.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // React / JS
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // SVG as React Component ? might be helpful?
      /*
       {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      */
    ],
  },
  plugins: [
    // Extract the CSS files (minification is handled in the optimization step)
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].min.js',
  },
};
