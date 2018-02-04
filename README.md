# 前端打包和技术栈系统总结

## Run

1. `https://github.com/designersmallweb/react-technology-stack.git`
2. `cd react-technology-stack`
3. `yarn`
4. `yarn start` for develop
5. `yarn build` for production
6. `yarn doc` for create API doc

## Structure introduction

1. `api`: API文档；
2. `docs`: 文档目录；
3.`mock` 应用服务模块
4. `public` favicon目录
5. `webpack`: 为webpack配置目录；
6. `.babelrc`: babel的配置文件，使用babel编译React和JavaScript代码；
7. `eslintrc, eslintignore`: 分别为eslint语法检测配置及需要忽略检查的内容或文件；
8. `package.json`: 为项目依赖管理文件；
9. `postcss.config.js`: CSS后编译器postcss的配置文件；
10.`README.md`: 项目说明文档；
11. `webpack.config.js`: 为webpack配置入口文件；
12. `yarn.lock`: 为项目依赖版本锁文件；
13. `src`: 开发代码目录
   1. ├──`components` 展示型组件
   2. ├──`config` 全局常量
   3. ├──`containers` 容器组件
   4. ├──`fetch` 请求API
   5. ├──`static` 公共样式和相关字体
   6. ├──`util` 辅助／工具函数
   7. ├──`index.html` 应用入口html
   8. ├──`app.js` 项目根组件文件


