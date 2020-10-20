const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {
  entry: "./src/index.ts",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    open: true,
    port: 5000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: ["ts-loader"],
      },
    ],
  },
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = config;
