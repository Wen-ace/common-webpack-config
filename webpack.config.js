const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let config = require('./config');

// 这里读取 src/js 文件夹下的文件，注入HTML中的顺序在这里确定了。
let entry = {};
let filenames = fs.readdirSync(path.join('./src/js'));
filenames.forEach(filename => {
    let name = filename.match(/(.*)\.\w*$/)[1];
    let path = './src/js/' + filename;
    entry[name] = path;
});


// default value
config = {
    publicPathLocal: '/',
    port: 8080,
    output: 'dist',
    https: false,
    htmlTemplate: './src/document.html',
    entry: false,
    hash: true,
    ...config
}

module.exports = {
    entry: config.entry || entry,
    output: {
        filename: config.hash ? 'js/[name].[hash:8].js' : 'js/[name].js',
        path: path.resolve(__dirname, config.output || 'dist'),
        publicPath: config.publicPathLocal || '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: config.hash ? 'src/images/[name].[hash:8].[ext]' : 'src/images/[name].[ext]'
                }
            },
            {
                test: /\.(html|ejs)$/,
                exclude: /node_modules/,
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'link:href']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            // {
            //     test: 
            // },
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-typescript']
                }
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [path.join(__dirname, './dist')]
        // }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, config.htmlTemplate || './src/document.html')
        }),
        new ExtractTextPlugin({
            filename: config.hash ? 'css/[name].[hash:8].css' : 'css/[name].css'
        })
    ],
    mode: 'development',
    devServer: {
        port: config.port || 8080,
        contentBase: './' + (config.output || 'dist'),
        compress: true,
        proxy: config.proxy,
        https: config.https,
        // hotOnly: true,
    },
    devtool: 'source-maps',
    stats: 'errors-only',
};