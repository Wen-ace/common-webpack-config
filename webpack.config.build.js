const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.config.js');
const config = require('./config');


module.exports = merge(webpackConfig, {
    output: {
        publicPath: config.publicPath || '/'
    },
    mode: 'production',
    devtool: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, './dist')]
        })
    ]
})
