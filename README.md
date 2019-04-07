## 使用Vue3.0+Webpack4.0+iView3.0+Router构建简单的项目

![图片](https://github.com/MrGaoGang/lucky_vue/blob/master/images/main.png?raw=true)

此脚手架配套vscode插件: [查看插件](https://github.com/MrGaoGang/lucky_npm)


项目地址:https://github.com/MrGaoGang/lucky_vue

先上效果图:
![image](https://github.com/MrGaoGang/lucky_vue/blob/master/images/view.gif?raw=true)

项目目录:
![image](https://github.com/MrGaoGang/lucky_vue/blob/master/images/project.png?raw=true)






> 1. npm init初始化npm的配置
> 2. npm install webpack --save-dev和npm install webpack-cli --save-dev
:安装webpack依赖
> 3. npm install webpack-dev-server --save-dev ：可以在开发环境提供很多服务，比如启动一个服务器，热更新，接口代理等;
> 4. 创建一个webpack.config.js文件

```
var path = require("path");

var config = {
    entry: {
        main: "./main.js" //指定入口文件
    },
    output: {
        path: path.join(__dirname, "./dist"), //指定输出目录
        publicPath: "/dist/",
        filename: "main.js"//输出文件
    }

}

module.exports = config;

//同时在项目根目录创建一个index.html文件和main.js文件

```

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <div id="app">Hello world</div>
    
    <script src="/dist/main.js"></script>
</body>
</html>
```

    然后使用npm run dev运行起来

> 5. 体验一下热更新,在main.js文件中写入:document.getElementById("app").innerHTML="哈哈哈哈"; 保存，你会发现页面已经更新了。


> 6. 在webpack的世界中每一个文件都是一个模块，比如css,js,html,jpeg对于不同的模块我们要使用不同的加载器进行处理；比如：css的加载器

```
//安装css加载器
npm install css-loader --save-dev
npm install style-loader --save-dev
//然后在webpack.config.js文件中添加对css的处理

var path = require("path");

var config = {
    entry: {
        main: "./main.js" //指定入口文件
    },
    output: {
        path: path.join(__dirname, "./dist"), //指定输出目录
        publicPath: "/dist/",
        filename: "main.js" //输出文件
    },
    module: {
        rules: [{
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        }]
    }

}
/**
大概的意思就是，当遇到了以css结尾的文件，首先将.css文件使用css-loader转换，然后通过style-loader转换，然后打包。
use选项可以是数组或者字符串，如果是数组的话，它的编译顺序是从后向前的
**/
```

> 预览一下：（先保存webpack.config.js文件，并重新执行npm run dev）
```
//添加一个index.css样式文件，然后在main.js中引入，你会发现文字变成了红色;
//index.css
#app {
    font-size: 18px;
    color: red;
}
//main.js
import "./index.css"

document.getElementById("app").innerHTML = "哈哈哈哈";
```
上述步骤完成之后，打开控制台，选中某一个标签，你会发现样式都直接写在了对应的标签下。

> 7. 使用webpack的插件功能；这里我们使用extract-text-webpack-plugin插件，将散落在各地的css提取出来，生成一个main.css

```   
npm install extract-text-webpack-plugin@next --save-dev
```
>由于extract-text-webpack-plugin目前不支持webpack4.0+,故此处需要安装extract-text-webpack-plugin@next版本

```

//修改配置文件
var path = require("path");
//导出插件
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var config = {
    entry: {
        main: "./main.js" //指定入口文件
    },
    output: {
        path: path.join(__dirname, "./dist"), //指定输出目录
        publicPath: "/dist/",
        filename: "main.js" //输出文件
    },
    module: {
        rules: [{
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                use:"css-loader",
                fallback:'style-loader'
            })
        }]
    },
    plugins:[
        //将提取后的文件命名为main.css
        new ExtractTextPlugin("main.css")
    ]

}

module.exports = config;
```
此时如果将之前的html文件中引入main.css文件，则main.css文件会生效：
```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/dist/index.css">
</head>
<body>

    <div id="app">Hello world</div>
    
    <script src="/dist/main.js"></script>
</body>
</html>

```

> 8. **正式开始搭建vue的开发环境**，因为vue大多是以单文件组件的方式存在，一个.vue文件中存在<template><script><style>三个部分，那么我们需要安装对应的加载器（类似于上面的css-loader）；

```
npm install vue
npm install vue-loader --save-dev //vue文件加载器
npm install vue-style-loader --save-dev //vue样式加载器
npm install vue-template-compiler --save-dev //vue模板加载器
npm install vue-hot-reload-api --save-dev//vue 文件热更新
npm install babel babel-loader babel-core --save-dev//安装babel支持es6语法
npm install babel-runtime --save-dev
npm install babel-preset-env babel-plugin-transform-runtime babel-plugin-istanbul babel-polyfill --save-dev
//babel-polyfill是为了兼容ie

npm install babel-preset-stage-2 babel-register --save-dev

其中版本号最好是如下:
"@babel/core": "^7.3.4",
    "babel": "^6.23.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.0.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",
    "@babel/preset-env": "^7.3.4",

    "babel-runtime": "^6.26.0",
    "css-loader": "^2.1.1",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "style-loader": "^0.23.1",
    "vue-hot-reload-api": "^2.3.3",
    "vue-loader": "^15.7.0",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.2.1"

```

```
//webpack.config.js配置
var path = require("path");

//导出插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var VueLoaderPlugin=require("vue-loader/lib/plugin")
var config = {
    entry: {
        //为了兼容ie加入入口文件babel-polyfill
        app: ["babel-polyfill", "./main.js"] //指定入口文件
    },
    output: {
        path: path.join(__dirname, "./dist"), //指定输出目录
        publicPath: "/dist/",
        filename: "main.js" //输出文件
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader",
                    fallback: 'style-loader'
                })
            }, {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: "css-loader",
                            fallback: "vue-style-loader"
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },

        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new VueLoaderPlugin()//vue插件
    ]

}

module.exports = config;

```

```
//根目录下新增一个babel.config.js
module.exports={
    presets:[
        [
            "@babel/preset-env",
            {
                targets:{
                    "browsers":["last 3 versions","ie>=9"]
                },
                useBuiltIns:"entry",
                debug:false
            }
        ]
    ]
}

```

```
//main.js文件改成:
//导入Vue
import Vue from "vue";
//导入首页
import App from "./App.vue"

new Vue({
    el:"#app",
    render:h=>h(App)
})

//App.vue
<template>
  <div class="home">{{message}}</div>
</template>

<script>
export default {
  data() {
    return {
      message: "你好世界！"
    };
  }
};
</script>
//scoped表示样式在当前文件中有效
<style scoped>
.home {
  color: red;
}
</style>


```

> 9.引入iview组件

详情请见:[引入iView详解](https://github.com/MrGaoGang/lucky_vue/blob/master/iview%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E.md)


> 10. 依赖说明：


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


最后附上项目地址:
[欢迎Star](https://github.com/MrGaoGang/lucky_vue)
