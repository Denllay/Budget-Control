const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  // Дев сервер
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    port: 8080,
  },
  plugins: [
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
