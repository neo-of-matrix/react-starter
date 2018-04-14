/**
 * @desc webpack开发环境配置文件
 */

const path = require('path');
//node path模块
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
//webpack-merge 合并多个webpack配置文件
const PUBLICPATH = '/assets/';
//dev导出目录
const PORT = '8080';
//端口号
const options = {
    mode: 'development',
    publicPath: PUBLICPATH,
    //导出目录
    loaders: {
        sass: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
            options: {
                importLoaders: 2
            }
        }, {
            loader: "postcss-loader"
        }, {
            loader: "sass-loader"
        }],
        less: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
            options: {
                importLoaders: 2
            }
        }, {
            loader: "postcss-loader"
        }, {
            loader: "less-loader"
        }],
        css: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
            options: {
                importLoaders: 1
            }
        }, {
            loader: "postcss-loader"
        }],
        imageAssets: [{
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: '[path][name].[ext]?[hash:8]'
            }
        }],
        iconFonts: [{
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: '[path][name].[ext]?[hash:8]'
            }
        }]
    },
    //相关loader
};
//传入webpack.common.js的参数
module.exports = function(args) {
    //args来自webpack.config.js传来的参数
    options.ROOTPATH = args.ROOTPATH;
    //传入根路径
    return webpackMerge(require('./webpack.common')(options), {
        devtool: 'source-map', //source-map开发环境方便查错
        devServer: {
            //webpack-dev-server配置选项
            contentBase: path.join(args.ROOTPATH, './src'),
            //静态文件服务器入口
            historyApiFallback: true,
            //任意的 404 响应都可能需要被替代为 index.html
            inline: true,
            //应用程序启用内联模式，构建消息将会出现在浏览器控制台
            open: true,
            //自动打开系统默认浏览器
            hot: true,
            //启用 webpack 的模块热替换特性，自动添加webpack.HotModuleReplacementPlugin插件
            port: PORT,
            //端口号
            proxy: {
                //代理
                '/': {
                    bypass: function(req, res, proxyOptions) {
                        console.log('Skipping proxy for browser request.');
                        return `${PUBLICPATH}/index.html`;
                    }
                }
                //解决访问二级路由404错误问题
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            //其他服务器热更新
        ]
    });
};