/* config-overrides.js */
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const smp = new SpeedMeasurePlugin();
module.exports = function override(config, env) {
    // config.entry = {
    //     app: './src/index.js',
    // },

    //     config.devtool = 'inline-source-map',

    //     config.devServer = {
    //         static: './dist',
    //         hot: true,
    //     },

    //     config.output = {
    //         filename: '[name].bundle.js',
    //         path: path.resolve(__dirname, 'dist'),
    //         clean: true,
    //     },

        // //do stuff with the webpack config...
        config.resolve.fallback = {
            "fs": false,
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify"),
            "url": require.resolve("url")
        },

        config.plugins = (config.plugins || []).concat([
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer']
            }),
            // new HtmlWebpackPlugin()
        ])

    config.module = {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.(ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: ["ts-loader"],
            },
        ],
    }


    // allow import file from src with @
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            '@': path.resolve(__dirname, 'src'),
        },
    }

    // workaround to remove MiniCssExtractPlugin before smp
    config.plugins = config.plugins.filter((plugin) => !(plugin instanceof MiniCssExtractPlugin));

    const configWithTimeMeasures = smp.wrap(config);
    configWithTimeMeasures.plugins.push(new MiniCssExtractPlugin({}));
    return configWithTimeMeasures
}