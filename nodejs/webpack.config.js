const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/index.js',
    target: 'node',
    devtool: '#eval-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'backend.js',
    },
    externals: nodeModules,
    mode: 'development',
    node: {
        __dirname: true,
        __filename: true,
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
        new CleanWebpackPlugin('build'),
    ],
};
