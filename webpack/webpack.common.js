/**
 * [webpack基础配置文件]
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//生成HTML5文件，插入所有script标签
module.exports = function (options) {
  const PUBLICPATH = options.publicPath;
  //导出目录
  const ROOTPATH = options.ROOTPATH;
  //传入根路径
  const entry = ['react-hot-loader/patch','./index.jsx'];
  //入口文件
  return {
    name: 'browser',
    context: path.resolve(ROOTPATH, 'src/'),
    //定义上下文环境
    entry: {
      app: entry
    },
    //入口，根据环境变量指定不同入口，这个也有多种配置方式
    //webpack-hot-middleware用来热更新另外的服务起，比如node的express服务器，模仿webpack-dev-server的热更新
    //path 事件流路径 timeout 超时断开 reload 当webpack停止时重新刷新页面
    output: {
      publicPath: PUBLICPATH,
      //按需加载或者加载图片和文件时有用，上线地址
      filename: 'scripts/[name].[chunkhash].js',
      //每个输出文件的名称，name使用默认名称
      path: path.resolve(ROOTPATH, 'dist/'),
      //输出路径，绝对路径
      chunkFilename: '[name].js'
      //非入口文件的名称
    },
    //出口
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use:{
            loader: 'babel-loader',
            options: {
              'cacheDirectory': true
            }
          }
        },
        {
          test: /\.(sass|scss)$/,
          exclude: /node_modules/,
          use: options.loaders.sass
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: options.loaders.less
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: options.loaders.css
        },
        {
          test: /\.(jpe?g|png|gif|svg|bmp)$/i,
          exclude: /node_modules/,
          use: options.loaders.imageAssets
        }, {
          test: /\.(woff|woff2|eot|ttf|otf|svg)($|\?)/i,
          exclude: /node_modules/,
          use: options.loaders.iconFonts
        }
      ]
    },
    //不同文件使用不同loader进行处理
    resolve: {
      modules: [
        'node_modules'
      ],
      //告诉 webpack 解析模块时应该搜索的目录
      alias: {
        entryHtml$: path.resolve(ROOTPATH, 'src/index.html'),
        components: path.resolve(ROOTPATH, 'src/components/'),
        containers: path.resolve(ROOTPATH, 'src/containers/'),
        routes: path.resolve(ROOTPATH, 'src/routes/'),
        store: path.resolve(ROOTPATH, 'src/store/'),
        api: path.resolve(ROOTPATH, 'src/api/'),
        config: path.resolve(ROOTPATH, 'src/config/'),
        constants: path.resolve(ROOTPATH, 'src/constants/'),
        helper: path.resolve(ROOTPATH, 'src/helper/'),
        styles: path.resolve(ROOTPATH, 'src/styles/')
      },
      //创建路径的别名，简写,$精确匹配，具体到文件
      extensions: ['.js', '.jsx', '.json']
      //可以解析省略后缀名的文件
    },
    //设置模块如何被解析
    plugins: [
      new webpack.BannerPlugin({ banner: "Copyright by zuishiguang@126.com" }),
      //添加开发者信息
      new webpack.DefinePlugin(options.globals),
      //定义变量，全局可以使用
      // 抽取js同时与ExtractTextPlugin搭配为公共块（common chunk）抽取样式文件
      new HtmlWebpackPlugin({
        template: path.resolve(ROOTPATH, 'src/index.html'),
        //HTML模板路径
        hash: false,
        //是否使用额外hash
        favicon: path.resolve(ROOTPATH, 'public/favicon.ico'),
        //favicon路径
        filename: 'index.html',
        //文件名
        inject: 'body',
        //script标签注入位置
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
        //使用html-minifier的选项压缩HTML
        //collapseWhitespace去除空白符
        //removeComments去除注释
        //removeAttributeQuotes如果可以，移除属性的引号
      })
    ]
  };
};
