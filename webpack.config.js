var path = require("path");

//导出插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var VueLoaderPlugin = require("vue-loader/lib/plugin")
var config = {
    entry: {
        //为了兼容ie加入入口文件babel-polyfill
        app: ["babel-polyfill", "./src//main.js"] //指定入口文件
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
                use: [{
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
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]

            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
               // include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules/iview/src")]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },

        ]
    },
    plugins: [
        //将css文件合并为main.css
        new ExtractTextPlugin("main.css"),
        new VueLoaderPlugin()
    ]

}

module.exports = config;