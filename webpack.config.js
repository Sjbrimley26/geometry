const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "build")
  },

  plugins: [
    new HtmlPlugin({
      template: "src/index.html"
    }),

    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],

  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true
    })]
  }
};
