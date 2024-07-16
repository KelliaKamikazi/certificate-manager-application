const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Matches .ts and .tsx files
        use: 'ts-loader', // Uses ts-loader for TypeScript files
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Matches .css files
        use: ['style-loader', 'css-loader'], // Uses style-loader and css-loader for CSS files
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // Matches .js files
        enforce: 'pre',
        use: 'source-map-loader', // Uses source-map-loader to process source maps for JavaScript files
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolves these extensions
  },
  output: {
    filename: 'bundle.js', // Output bundle filename
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serves static files from the dist directory
    },
    port: 3000, // Development server port
    hot: true, // Enables Hot Module Replacement
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans the dist directory before each build
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template for the HTML file
    }),
  ],
};
