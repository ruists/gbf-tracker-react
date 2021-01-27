const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/",
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: SRC_DIR,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    open: true,
    port: 9000,
  },
  plugins: [new webpack.DefinePlugin({ "process.env": JSON.stringify(dotenv.parsed) })],
};

module.exports = config;
