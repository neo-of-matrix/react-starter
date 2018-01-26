### 3、babel安装和配置 ###
### 安装 ###
    ---必备---
    yarn add babel-core --dev //Babel 的核心依赖包
    yarn add babel-preset-env --dev //相当于 es2015 ，es2016 ，es2017 及最新版本
    yarn add babel-loader --dev //webpack loader解析js/jsx（上一节已使用）
    yarn add babel-eslint --dev //eslint（后面介绍）
    yarn add babel-preset-react --dev //解析jsx语法
    yarn add babel-plugin-import --dev //蚂蚁金服出品，按需加载资源
    yarn add react-hot-loader //支持react热更新，构建时不会打包
    yarn add babel-polyfill //支持新增变量和方法，兼容旧版的浏览器
    ---可选---
    yarn add babel-plugin-transform-class-properties --dev //转换类的私有属性
    yarn add babel-plugin-transform-es2015-classes --dev //转换es2015公共类，比如Date, Array, DOM
    yarn add babel-plugin-transform-runtime --dev //库和工具里面使用，减少polyfill重复代码，避免全局变量污染
    yarn add babel-preset-stage-0 --dev //最全转换，有一些实验性功能
    yarn add babel-runtime //库和工具里面使用，减少polyfill重复代码，避免全局变量污染

### 配置 ###
项目目录新建.babelrc文件

参考[https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc](https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc "https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc")
