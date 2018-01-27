### 2、webpack安装和配置 ###
现在打包工具有webpack rollup parcel等，现在介绍webpack，其他工具参考其他文章，或许后续会出相关文章。
webpack v3 v2 和 v1有些配置会不一样，本文着重介绍webpack v3
### 安装 ###
    npm install webpack --save-dev
### 所有插件安装目录 ###
    yarn add webpack-dev-server --dev //webpack小型服务器
    yarn add webpack-merge --dev //合并多个配置文件
    yarn add css-loader --dev //解析@import和url()，在import/require以后使用
    yarn add style-loader --dev //自动添加link标签
    yarn add file-loader --dev //解析import，返回public地址
    yarn add url-loader --dev //类似file-loader，额外可以转换为base64
    yarn add babel-loader --dev //解析ES6文件
    yarn add postcss-loader --dev //使用PostCSS处理CSS文件
    yarn add less --dev //less依赖
    yarn add less-loader --dev //把less文件转换为css
    yarn add node-sass --dev //sass依赖
    yarn add sass-loader --dev //把sass文件转换为css
    yarn add img-loader --dev //压缩图片
    yarn add clean-webpack-plugin --dev //构建时删除输出目录
    yarn add extract-text-webpack-plugin --dev //提取文本到单独文件
    yarn add html-webpack-plugin --dev //自动生成HTML5文件
    yarn add uglifyjs-webpack-plugin --dev //压缩JS代码
    yarn add webpack-dev-middleware --dev 服务器中间件（webpack-dev-server内嵌），也可以搭配其他浏览器使用（可选）
    yarn add webpack-hot-middleware --dev //另外搭建的服务器热更新插件（可选）
    yarn add html-webpack-harddisk-plugin --dev// 把webpack-dev-server或者middleware生成的HTML文件写入硬盘，多个中间件使用（可选）

### 配置 ###
在项目目录创建webpack.config.js
一般配置文件全部放在webpack.config.js里面
但是实际上基本会分为3个文件

    webpack.common.js 共同配置
    webpack.dev.js  开发环境配置
    webpack.prod.js 生产环境配置

我参考网上配置，总结一下
webpack分为4个文件

    webpack.config.js webpack配置入口（后3个放在一个文件夹webpack）
    webpack.common.js 共同配置
    webpack.dev.js  开发环境配置
    webpack.prod.js 生产环境配置

下面分别介绍各个文件

webpack.config.js(package.json里边的CLI命令是指向这个文件)

    //webpack配置文件有多种写法，这是一种导出函数的写法
    module.exports = (enviroment)=> {
    //enviroment 是package.json CLI命令传来的
      let env; //定义环境变量
      let _DEV_ = true; //定义常亮
      let _PROD_ = false;
      switch (enviroment) {
      case 'dev':
        env = 'dev';
        _DEV_ = true;
        _PROD_ = false;
        break;
      case 'production':
        env = 'prod';
        _DEV_ = false;
        _PROD_ = true;
        break;
      default:
        env = 'dev';
        _DEV_ = true;
        _PROD_ = false;
      }
      // 根据环境参数动态决定引入对应配置文件
      // require(路径)(作为导入的module.exports的参数)
      return require(`./webpack/webpack.${env}.js`)({
      ROOTPATH: __dirname,
      _DEV_,
      _PROD_,
      env
      });
    };

package.json

    "scripts": {
        "start": "cross-env NODE_ENV=dev && webpack-dev-server --color --bail --env dev",
        "build": "cross-env NODE_ENV=production && webpack --env production"
      },
    //cross-env webpack-dev-server需要安装
    //yarn add cross-env webpack-dev-server --dev
    //cross-env解决不同系统下命令不同
    //webpack-dev-server webpack小型服务器
    //--color 有颜色 --progress 显示进度 --bail 由于使用NoEmitOnErrorsPlugin插件，需要指定--bail显示错误
    //NODE_ENV=dev、production 设置node环境为dev
    //--evn dev/production 传入webpack.config.js的enviroment

webpack.common.js

由于代码较长，大家自行下载查看

[https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.common.js](https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.common.js "https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.common.js")

webpack.dev.js

[https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.dev.js](https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.dev.js "https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.dev.js")

webpack.prod.js

[https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.prod.js](https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.prod.js "https://github.com/designersmallweb/react-technology-stack/blob/master/webpack/webpack.prod.js")