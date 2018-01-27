### 3、babel安装和配置 ###
### 安装 ###
    yarn add babel-core --dev //Babel 的核心依赖包
    yarn add babel-preset-env --dev //相当于 es2015 ，es2016 ，es2017 及最新版本
    yarn add babel-loader --dev //webpack loader解析js/jsx（上一节已使用）
    yarn add babel-preset-stage-2 --dev //stage-2基本稳定，只能增加新的功能
    yarn add babel-polyfill //兼容旧版的浏览器
    yarn add babel-plugin-transform-decorators-legacy --dev //支持修饰符语法
    yarn add babel-eslint --dev //babel的eslint插件（后面介绍）
    yarn add babel-preset-react --dev //解析jsx语法
    yarn add babel-plugin-import --dev //蚂蚁金服出品，按需加载资源
    yarn add react-hot-loader //支持react热更新，构建时不会打包
    yarn add babel-plugin-transform-runtime --dev //支持helpers，polyfill，regenerator配置，减少polyfill重复代码，避免全局变量污染
    yarn add babel-runtime //支持helpers，polyfill，regenerator配置，减少polyfill重复代码，避免全局变量污染

### 配置 ###
项目目录新建.babelrc文件

参考[https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc](https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc "https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc")
