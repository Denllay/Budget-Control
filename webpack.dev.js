const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  // Дев сервер
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public", "index.html"),
    }),
    // Копирование
    new CopyPlugin({
      patterns: [{ from: "./src", to: "./static" }],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
};
