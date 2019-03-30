var merge = require("webpack-merge");
var baseConfig = require("./webpack.base.config.js");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

baseConfig.plugins = [];
module.exports = merge(baseConfig, {
    plugins: [
        new VueLoaderPlugin(),
        //将css文件合并为main.css
        new ExtractTextPlugin({
            filename: "main.css",
            allChunks: true
        }),
    ]
})