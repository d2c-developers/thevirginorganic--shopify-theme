const path = require('path');

module.exports = {
  entry: {
    theme: './src/theme.ts',
    'list-collections': './src/list-collections.ts',
    collection: './src/collection.ts',
    product: './src/product.ts',
    cart: './src/cart.ts',
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
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].min.js',
  },
};
