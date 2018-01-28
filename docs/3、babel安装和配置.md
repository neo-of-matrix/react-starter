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
    yarn add babel-plugin-transform-react-remove-prop-types --dev //构建时移除prop-types相关代码，在业务代码逻辑中使用这个插件，可能会引发问题，配合eslint-plugin-react使用

### 配置 ###
项目目录新建.babelrc文件

参考[https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc](https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc "https://github.com/designersmallweb/react-technology-stack/blob/master/.babelrc")

### babel-polyfill的几种使用方式 ###

### 第一种babel-runtime & babel-plugin-tranform-runtime ###

### 使用方法 ###

package中添加开发依赖babel-plugin-tranform-runtime以及生产依赖 babel-runtime

.babelrc中指定插件:"plugins": ["transform-runtime"]

### 优点 ###

无全局污染

依赖统一按需引入,无重复引入,无多余引入

适合用来编写lib(第三方库)类型的代码

### 缺点 ###

被polyfill的对象是临时构造并被import/require的,并不是真正挂载到全局

由于不是全局生效,对于实例化对象的方法无法使用

### 第二种全局babel-polyfill ###

使用方法

方法1: (浏览器环境)单独在html的<head>标签中引入babel-polyfill.js(CDN或本地文件均可)

方法2: 在webpack配置文件增加入口，package.json中添加生产babel-polyfill依赖

方法3: 在webpack入口文件顶部使用import/require引入，package.json添加生产依赖babel-polyfill

### 优点 ###

一次性解决所有兼容性问题,而且是全局的,浏览器的console也可以使用

### 缺点 ###

一次性引入了ES@next的所有polyfill,打包后的js文件会偏大

对于现代的浏览器,有些不需要polyfill,造成流量浪费

污染了全局对象

不适合框架或库的开发

### 第三种全局babel-polyfill(使用babel-preset-env和useBuiltIns) ###

### 使用方法 ###

packge.json引入开发依赖babel-preset-env

.babelrc中使用preset-env

指定useBuiltins选项为true

指定浏览器环境或node环境

在webpack入口文件中使用import/require引入polyfill

### 优点 ###

按需(按照指定的浏览器环境所需,并非按照代码所需)引入polyfill,一定程度上减少了不必要polyfill的引入

配置简单,无需对webpack\html做额外的配置\引入

注意:

不可与方法3混用,否则会引起冲突
全局方式要保证polyfill在所有其它脚本之前被执行

### 第四种polyfill.io ###

一个CDN方式提供的polyfill,可根据浏览器UserAgent自动返回合适的polyfill

