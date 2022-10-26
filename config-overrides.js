const webpack = require("webpack");
const path = require("path");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpack: function (config, env) {
    // Parallel option does not work sometimes in CircleCI
    config.optimization.minimizer.forEach((minimizer) => {
      if (minimizer && minimizer.options) {
        minimizer.options.parallel = false;
      }
    });

    // webpack 5 polyfill
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util/"),
        // assert: require.resolve("assert"),
        // http: require.resolve("stream-http"),
        // https: require.resolve("https-browserify"),
        // os: require.resolve("os-browserify"),
        // url: require.resolve("url"),
      },
      plugins: [new TsconfigPathsPlugin()],
      // alias: {
      //   ...config.resolve.alias,
      //   "@": path.resolve(__dirname, "src"),
      // },
    };

    //plugin to show progress
    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
      new ProgressBarPlugin({
        format:
          "  build :msg [:bar] " +
          chalk.green.bold(":percent") +
          " (:elapsed seconds)",
        clear: false,
      }),
    ]);

    config.resolveLoader = {
      ...config.resolveLoader,
      alias: {
        hbs: "handlebars-loader",
      },
    };
    return config;
  },
};
