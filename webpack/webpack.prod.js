/**
 * [webpack生产环境配置文件]
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//生成独立文件
const ENV = process.env.NODE_ENV || 'production';

// 拓展配置
const options = {
  publicPath: '//www.example.com/',
  //CDN地址
  loaders: {
    sass: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }),
    //提取内容到单独文件，样式文件较大时使用
    less: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    }),
    css: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader'
      ]
    }),
    imageAssets: [
    {
      loader:'url-loader',
      options:{
        limit:5000,
        name:'[path][name]-[hash:8].[ext]'
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
  },
  globals: {
    'process.env.NODE_ENV': JSON.stringify(ENV),
    '__DEV__': ENV === 'dev',
    '__PROD__': ENV === 'production',
    '__TEST__': ENV === 'test'
  }
};

module.exports = function (args) {
  options.ROOTPATH = args.ROOTPATH;
  options.env = args.env;
  return webpackMerge(require('./webpack.common')(options), {
    devtool:'false',
    plugins: [
      new CleanWebpackPlugin(['dist'],{
        root:args.ROOTPATH
      }),
      //构建前删除dist目录
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // common chunk 的名称, 不指定filename时，生成文件的默认文件名
        filename: 'scripts/common.js',//common chunk 的文件名模板
        minChunks: function(module) {
            if (module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
                return false;
            }
            return module.context && module.context.includes("node_modules");
        }
        //移入公共chunck的条件（这里不太清楚）,配合ExtractTextPlugin配合使用
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].css' //生成文件的文件名，name默认文件名
      }),
      // 生成独立css文件
      new UglifyJsPlugin(),
      //UgligyJsPlugin压缩插件，替换原来的webpack.optimize.UglifyJsPlugin插件
      new webpack.optimize.ModuleConcatenationPlugin()
      //作用域提升，提高打包速度，压缩打包大小
    ]
  });
};
