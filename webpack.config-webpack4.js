/**
 * @desc Webpack配置入口
 * @author zuishiguang@126.com
 */
//webpack配置文件有多种写法，这是一种导出函数的写法
module.exports = (enviroment)=> {
//enviroment 是package.json CLI命令传来的
  let env; //定义环境变量

  switch (enviroment) {
    case 'dev':
      env = 'dev';
      break;
    case 'prod':
      env = 'prod';
      break;
    default:
      env = 'dev';
  }

  // 根据环境参数动态决定引入对应配置文件
  // require(路径)(作为导入的module.exports的参数)
  return require(`./webpack/webpack.${env}.js`)({
    ROOTPATH: __dirname
  });
};
