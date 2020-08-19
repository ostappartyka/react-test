const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {  
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/components/index.tsx",
    target: "web",
    mode: "development",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "awesome-typescript-loader",
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.css$/,
          loader: "css-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "components", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "./src/components/index.css",
      }),
      new webpack.DefinePlugin(envKeys)
    ],
  }
};
