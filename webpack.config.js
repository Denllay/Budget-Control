const { default: merge } = require("webpack-merge");
const Base = require("./webpack.base");
const Dev = require("./webpack.dev");
const Prod = require("./webpack.prod");
module.exports = () => {
  return process.env.NODE_ENV === "development"
    ? merge(Base, Dev)
    : merge(Base, Prod);
};
