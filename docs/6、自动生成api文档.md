### 6、自动生成api文档 ###
利用注释自动生成api文档
只能识别以下格式

    /**
     * This function adds one to its input.
     * @param {number} input any number
     * @returns {number} that number, plus one.
     */

### 安装 ###

    yarn add documentation --dev

### 配置 ###
package.json文件

    "scripts": {
       "doc": "./node_modules/.bin/documentation build src/app.js -f html -o api"
    }

build 生成文档，入口文件
-f 设置各种格式 html/md/json...
-o 设置输出目录 api目录

注释

    /**
     * Creates a popup component //简介说明
     * @author <name> [<emailAddress>]
     * 作者信息
     * @class [<type> <name>]
     * 表示一个构造器
     * @classdesc <some description>
     * 描述class功能
     * @copyright <some copyright text>
     * 版权信息
     * @desc <some description>
     * 描述信息，任何地方可以使用
     * @example
     * 提供示例
     * @file (synonyms: @fileoverview, @overview)
     * 描述文件信息，放在文件开头
     * @kind <kindName>
     * 表明块类型，class constant event external file function member mixin module namespace typedef
     * @module [[{<type>}] <moduleName>]
     * 模块信息，比如变量等
     * @name <namePath>
     * 对象名称
     * @param (synonyms: @arg, @argument)
     * 参数信息
     * @returns [{type}] [description]
     * 返回值
     * @see <namepath>
     * @see <text>
     * 参考信息
     * @version
     * 版本信息
     */
