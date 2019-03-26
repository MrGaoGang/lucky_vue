## 使用Vue3.0+Webpack4.0+iView3.0构建简单的项目





### 10. 依赖说明：
    "babel-plugin-import": "^1.11.0",//iview或者其他库的按需引入
    "@babel/core": "^7.3.4",//babel核心库，将es6/es7转化成es2015
    "@babel/preset-env": "^7.3.4",
    "babel": "^6.23.0",
    "babel-loader": "^8.0.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",//兼容ie，
    "babel-runtime": "^6.26.0",
    "clean-webpack-plugin": "^2.0.1",//构建生产环境时清楚已有构建目录
    "css-loader": "^2.1.1",//css加载器
    "extract-text-webpack-plugin": "^4.0.0-beta.0",//将多个css样式打包成一个css文件
    "file-loader": "^3.0.1",//file-loader和url-loader配合使用，当url-loader无法加载时会自动使用file-loader，注意：引入iview.css必须要加载此包
    "html-loader": "^0.5.5",//html加载器
    "html-webpack-plugin": "^3.2.0",//生产环境打包时生成index.html文件
    "iview-loader": "^1.2.2",//iview的加载器
    "less": "^2.7.1",//less文件加载器
    "less-loader": "^2.2.3",
    "style-loader": "^0.13.1",
    "uglifyjs-webpack-plugin": "^2.1.2",//构建生产环境时 将代码压缩
    "url-loader": "^1.1.2",
    "vue-hot-reload-api": "^2.3.3",//vue热加载
    "vue-loader": "^15.7.0",//vue加载器
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.2.1",//测试环境时开启本地端口
    "webpack-merge": "^4.2.1",//webpack的合并
