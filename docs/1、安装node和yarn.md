本文是windows版本，其他系统版本大同小异，不同之处另开贴
### 1、安装node和yarn ###
npm和yarn都是包管理工具，npm yarn都是基于node，yarn比npm具有一些优点，速度快，npm也在完善中。两者的比较参考其他文章。
#### Node ####
LTS 长期版本（建议） Current 当前版本（或许会出现一些bug）
#### 安装  ####
下载msi 32/64位（add path对勾）
#### 更新 ####
覆盖安装
#### Npm ####
#### 安装 ####
node 附带安装
#### 更新 ####
    npm install npm@latest -g
#### 相关命令 ####

#### 项目初始化（创建package.json） ####
    npm init / npm init -y
#### 列出包 ####
    npm ls -g 列出全局依赖
    npm ls 列出当前项目依赖
#### 升级包 ####
原生命令：注意依赖问题

    npm update -g
    npm update

使用工具npm-check

    npm install -g npm-check
    npm-check -gu 更新全局依赖
    npm-check -u 更新当前项目依赖

#### 清理（官方不推荐建议npm cache verify，缓存占用较大时可以使用） ####
缓存路径C:\Users\Dirk\AppData\Roaming\npm-cache
npm cache clean --force
#### Yarn ####
#### 安装 ####
windows 下载安装程序
地址：https://npm.taobao.org/mirrors/yarn/
#### 更新 ####
windows 下载安装程序覆盖安装
#### 列出包 ####
    yarn global list 列出全局的包
    yarn list 列出当前项目的包
#### 升级包 ####
    yarn upgrade [package]更新当前项目小版本
    yarn upgrade --latest 更新当前所有项目可能跨版本
    yarn global upgrade 全局更新小版本
    yarn global upgrade --latest 全局更新跨版本
#### 换源（原因下载外国地址的包时速度慢） ####
#### npm ####
    npm config get registry 查看镜像地址

    npm config set registry https://registry.npm.taobao.org 修改镜像地址

    npm config set disturl https://npm.taobao.org/dist

    npm config set SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass/

    npm config set phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs/

    npm config set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/

    npm config set PYTHON_MIRROR=http://npm.taobao.org/mirrors/python/

    npm config set NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node/

    npm config set NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs/

    npm config set NVMW_NPM_MIRROR=http://npm.taobao.org/mirrors/npm/

    npm config set chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver/

    npm config set operadriver_cdnurl=http://npm.taobao.org/mirrors/operadriver/

    npm config set profiler_binary_host_mirror=http://npm.taobao.org/mirrors/node-inspector/
#### cnpm ####
    npm install -g cnpm --registry=https://registry.npm.taobao.org 安装cnpm并设置镜像地址
    cnpm config get registry 查看镜像地址
    cnpm config set registry https://registry.npm.taobao.org 修改镜像地址
#### yarn ####
    yarn config get registry 查看镜像地址
    yarn config set registry https://registry.npm.taobao.org 修改镜像地址
