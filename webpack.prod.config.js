var webpack = require("webpack");
//打包时会自动生成index.html并替换已有的index.html，bundle.js也会自行添加到 html 中
var HtmlwebpackPlugin = require("html-webpack-plugin");
//将css合并为一个css文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//避免重复配置webpack,静基础配置和生产配置融合
var merge = require("webpack-merge");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
//基础配置
var webpackBaseConfig = require("./webpack.config.js");
//清空构建目录
var clearWebpack = require("clean-webpack-plugin");
//代码压缩
var UglifyESPlugin  = require("uglifyjs-webpack-plugin");

webpackBaseConfig.plugins = [];
module.exports = merge(webpackBaseConfig, {
  mode: "production",//当前模式
  output: {
    publicPath: "./dist/",//输出路径
    libraryTarget:"umd",//输出为umd格式
    filename: "[name].[hash].js",//输出文件名
    chunkFilename: "[name].[hash].chunk.js"
  },
  plugins: [
    new clearWebpack(),//构建生产环境包的时候清空dist目录
    new ExtractTextPlugin({//将所有的样式合并为一个css文件
      filename: "[name].[hash].css",
      allChunks: true
    }),
    new webpack.DefinePlugin({//定义当前的Node环境为生产环境
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),

    new HtmlwebpackPlugin({//指定构建生成之后的html
        filename:"../index_pro.html",//此文件路径是相对于dist
    }),
    new VueLoaderPlugin(),//使用vue必须要加的哦
    new UglifyESPlugin({//代码压缩
        // 多嵌套了一层
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          }
        }
      })
  ]
});
