const { override, fixBabelImports, addBabelPlugin } = require('customize-cra');


module.exports = override(

  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),

  addBabelPlugin(["@babel/plugin-proposal-decorators", { legacy: true }]),

);
