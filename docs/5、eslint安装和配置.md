### eslint安装和配置 ###
插件化的JavaScript和JSX校验工具
### 安装 ###

    yarn add eslint --dev
    //eslint 基本依赖
    yarn add babel-eslint --dev
    //设置解析器，解析不能够被eslint识别的语言特性
    yarn add eslint-plugin-babel --dev
    //配合babel-eslint使用，修复了一些实验性特性
    yarn add eslint-plugin-react --dev
    //支持react校验
    yarn add eslint-config-standard --dev
    //扩展eslint规则
    yarn add eslint-config-standard-react --dev
    //扩展react校验
    yarn add eslint-plugin-import --dev
    yarn add eslint-plugin-node --dev
    yarn add eslint-plugin-promise --dev
    yarn add eslint-plugin-standard --dev
    //eslint-config-standard和eslint-config-standard-react的依赖包

### 配置 ###
在根目录新建.eslintrc文件和.eslintignore忽略验证的目录和文件
参考
[https://github.com/designersmallweb/react-technology-stack/blob/master/.eslintrc](https://github.com/designersmallweb/react-technology-stack/blob/master/.eslintrc "https://github.com/designersmallweb/react-technology-stack/blob/master/.eslintrc")