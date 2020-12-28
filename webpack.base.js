const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.bundle\.ts$/,
        use: {
          loader: "bundle-loader",
          options: {
            name: "[name]",
          },
        },
      },
      // Тупескрипт
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // Картинки
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // Шрифты
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      // Сксс
      {
        test: /\.scss|\.sass$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
                modules: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // ХТМЛ
    // Очистка говна
    new CleanWebpackPlugin(),
  ],
};
