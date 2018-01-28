### Postcss 安装和配置 ###
PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS变量 和 Mixins， 新的CSS语法，模拟类似sass的功能，内联图片等。

我们现在使用PostCss的自动添加前缀插件autoprefixer，其他功能前面已经实现
### 使用 ###

在 webpack.config.js 里使用 postcss-loader :

    yarn add postcss-loader --dev

    sass: [{
              loader: "style-loader"
          }, {
              loader: "css-loader",
              options:{
                importLoaders: 2
              }
          }, {
              loader: "postcss-loader"
          },{
              loader: "sass-loader"
          }]
    //loader执行顺序是从后向前，postcss-loader放在css-loader之前，sass-loader和less-loader之前，importLoaders是设置在css-loader之前有几个loader

在项目根目录新建postcss.config.js，这是postcss的配置文件

    yarn add autoprefixer --dev

    module.exports = {
      plugins: [
        require('autoprefixer')({
          browsers: ['last 2 versions']
        })
      ]
    }
    //autoprefixer是postcss的插件，自动添加前缀
