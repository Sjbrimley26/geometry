const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "build")
  },

  plugins: [
    new HtmlPlugin({
      template: "src/index.html"
    })
  ],

  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true
    })]
  }
};
