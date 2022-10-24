/* config-overrides.js */
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
const webpack = require('webpack');
const path = require('path');
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    }
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return {
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.alias,
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
}