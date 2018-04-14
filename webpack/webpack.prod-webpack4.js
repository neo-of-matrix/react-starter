/**
 * [webpack生产环境配置文件]
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//生成独立文件

// 拓展配置
const options = {
    //publicPath: '',
    //上线地址
    mode:'production',
    loaders: {
        sass: ExtractTextPlugin.extract({
            use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        importLoaders: 2
                    }
                },
                'postcss-loader',
                'sass-loader'
            ],
            fallback: 'style-loader'
        }),
        //提取内容到单独文件，样式文件较大时使用
        less: ExtractTextPlugin.extract({
            use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        importLoaders: 2
                    }
                },
                'postcss-loader',
                'less-loader'
            ],
            fallback: 'style-loader'
        }),
        css: ExtractTextPlugin.extract({
            use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ],
            fallback: 'style-loader'
        }),
        imageAssets: [{
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: '[path][name]-[hash:8].[ext]'
                }
            },
            {
                loader: 'img-loader',
                options: {
                    // 根据环境判断是否启用资源压缩
                    // enabled: process.env.NODE_ENV === 'production',
                    gifsicle: {
                        interlaced: false // 替换使用渐进式渲染
                    },
                    mozjpeg: {
                        progressive: true // 创建基准jpeg文件
                    },
                    optipng: {
                        optimizationLevel: 4 // 优化级别，0-7，值越大，压缩越多
                    },
                    pngquant: {
                        quality: '75-90', // 压缩质量，0-100，值越高，质量越高
                        floyd: 0.5, // 图片抖动值，0-1，越高抖动越厉害
                        speed: 2 // 执行速度，0-10，速度过高质量受损，不建议过高
                    },
                    svgo: {
                        plugins: [
                            { removeTitle: true }, // 去除标题信息
                            { convertPathData: false } // 转换路径为更短的相对或决定路径
                        ]
                    }
                }
            }
        ],
        iconFonts: [{
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: '[path][name]-[hash:8].[ext]'
            }
        }]
    }
};

module.exports = function(args) {
    options.ROOTPATH = args.ROOTPATH;

    return webpackMerge(require('./webpack.common')(options), {
        devtool: 'false',
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: args.ROOTPATH
            }),
            //构建前删除dist目录
            new ExtractTextPlugin({
                filename: 'css/[name].[chunkhash].css' //生成文件的文件名，name默认文件名
            }),
            // 生成独立css文件
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            //UgligyJsPlugin压缩插件，替换原来的webpack.optimize.UglifyJsPlugin插件
            new webpack.optimize.ModuleConcatenationPlugin(),
            //作用域提升，提高打包速度，压缩打包大小
            new BundleAnalyzerPlugin()
        ],
        optimization: {
          //分割chunks代码
            splitChunks: {
                chunks: 'all',
                //all async intial 什么时候执行分割代码
                //all 所有chunk
                //async 按需加载时
                //intial 初始化
                minSize: 30000,
                //chunk最小尺寸
                minChunks: 1,
                //共享代码数量
                maxAsyncRequests: 5,
                //初始化加载最大并发请求数
                maxInitialRequests: 3,
                //按需加载时的最大并发数
                name: true,
                //自动命名
                automaticNameDelimiter: '~',
                //命名分隔符
                cacheGroups: {
                  //属性名为缓存代码块名字
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        //vendors chunk整个应用node_modules代码快
                        chunks: 'all',
                        priority: -10,
                        //设置优先级
                        reuseExistingChunk: true,
                        //使用存在的chunk
                    },
                    /*commons: {
                        name: "commons",
                        chunks: "initial",
                        minChunks: 2
                    }*/
                    /*是否抽取JS里面的CSS放到单独的CSS文件里面*/
/*                    styles: {
                        test: /\.(less|sass|scss|css)$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true
                    }*/
                }
            }
        }
    });
};