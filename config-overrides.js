// 基于customize和react-app-rewired的定制化配置文件

const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy } = require('customize-cra')

const modifyVars = require('./thems')
module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  
)