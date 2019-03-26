
## iview集成说明

### 一、需要引入那些包

```
npm install iview

//一些其他的包
//加载器
npm install iview-loader --save-dev
//file-loader和url-loader配合使用，当url-loader无法加载时会自动使用file-loader，注意：引入iview.css必须要加载此包
npm intstall file-loader --save-dev
npm intstall url-loader --save-dev
//按需加载
npm install babel-plugin-import --save-dev
//vue/iview的js文件 兼容ie
npm install babel-polyfill --save-dev

```

### 二、webpack的配置

```
webpack的module中新增如下配置：

{
        test: /\.vue$/,
        use: [
          {
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
            loader: "iview-loader",
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /iview\/.*?js$/,
        loader: "babel-loader"
      },
      {
        test: /iview.src.*?js$/,//为了兼容ie，否则在ie浏览器无法预览iview组件
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },

      {
        //此处配置为iview的注意点，如果不配置的话 无法再Js文件中加载iview.css文件；其次如果使用url-loader无法加载的话，会使用file-loader进行文件加载
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=1024"
      },

```

### 三、引入css样式
> 首先在main.js使用 import "babel-polyfill"; 兼容ie浏览器

> 在main.js引入 import 'iview/dist/styles/iview.css';

### 四、按需引入

```js
//在.babelrc/babel.config.js中添加如下代码：
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
    ],
    plugins: [
        [
          "import",
          {
            "libraryName": "iview",
            "libraryDirectory": "src/components"
          }
        ]
      ]
}

```
> **注意如果使用了按需加载则不需要像其他帖子说的那样，使用Vue.use(iView)全局引入了。**

```
//再需要的地方这样使用就行了:
<template>
  <div>
    <div class="home">{{message}}</div>
    <Input v-model="message" placeholder="please input data"/>
    <Pagenation></Pagenation>
  </div>
</template>

<script>
import { Input } from "iview";
import Pagenation from "./components/Pagenaton.vue";
export default {
  data() {
    return {
      message: "你好世界！"
    };
  },
  components: { Input, Pagenation }//注意哦，这里不是components:[]
};
</script>

<style scoped>
.home {
  color: red;
}
</style>


```


