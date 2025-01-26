const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
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
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'postcss-loader'],
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
    // Make the CSS files
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].min.js',
  },
};
