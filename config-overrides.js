const {override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    //针对antd实现按需打包：根据import来打包，使用babel-plugin-import（如果之用了button和message，那么就。。。）
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,//只要你引入了对应的组件，自动打包相关的样式
}),
    //使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@primary-color':'#1DA57A'},//将less文件修改了，而不是修改css文件，将支付宝的蓝色主题改为绿色
    })
    );