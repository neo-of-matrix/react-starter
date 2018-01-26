# 前端打包和技术栈系统总结

## Run

1. `git clone https://github.com/zuishiguang@126.com/react-blog.git`
2. `cd react-technology-stack`
3. `yarn`
4. `yarn start` for develop
5. `yarn build` for production
6. `yarn doc` for create API doc

## Structure introduction

1. `webpack`: 为webpack配置目录；
2. `webpack.config.js`: 为webpack配置入口文件；
3. `package.json`: 为项目依赖管理文件；
4. `yarn.lock`: 为项目依赖版本锁文件；
5. `.babelrc`: babel的配置文件，使用babel编译React和JavaScript代码；
6. `eslintrc, eslintignore`: 分别为eslint语法检测配置及需要忽略检查的内容或文件；
7. `postcss.config.js`: CSS后编译器postcss的配置文件；
8. `API.md`: API文档入口；
9. `docs`: 文档目录；
10. `README.md`: 项目说明文档；
11. `src`: 开发代码目录
   1. ├──`api` 请求API
   2. ├──`styles` 样式
   3. ├──`components` 展示型组件
   4. ├──`config` 全局配置
   5. ├──`constants` 常量
   6. ├──`containers` 容器组件
   7. ├──`helper` 辅助／工具函数
   8. ├──`store` redux store相关
   9. ├──`middlewares` 中间件
   10. ├──`routes` 应用路由模块
   11. ├──`services` 应用服务模块
   12. ├──`index.html` 应用入口html
   13. ├──`app.js` 项目根组件文件


