// const webpack = require("webpack");
const path = require("path");

module.exports = {
    publicPath: "/",

    // 如果是hash模式
    // publicPath: env !== "development" ? "./" : "/",

    // 如果是history模式
    // publicPath: env !== "development" ? "/" : "/",

    //去除eslint 校验代码
    lintOnSave: false,

    // 静态资源目录 (js, css, img, fonts)
    assetsDir: "assets",

    //关键点在这  原来的 Compiler 换成了 runtimeCompiler
    runtimeCompiler: true,

    //设置打包之后是否打包.map文件
    productionSourceMap: false,

    // productionSourceMap: env !== "development" ? false : true,

    // 输出文件目录
    outputDir: "dist",

    // 让样式找到源
    css: {
        sourceMap: true,
        loaderOptions:{
            scss: {
                prependData: `@import "Assets/resources/common.scss";`
              },
        }
    },

    devServer: {
        port: 8080,
        host: "0.0.0.0",
        hot: true,
        open: false,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "127.0.0.1", //对应跨域的接口
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },

    chainWebpack: config => {
        config.resolve.alias.set("Component", path.resolve(__dirname, "./src/components"));
        config.resolve.alias.set("Pages", path.resolve(__dirname, "./src/pages"));
        config.resolve.alias.set("Assets", path.resolve(__dirname, "./src/assets"));
        config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
    },

    configureWebpack: config => {},

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/assets/reources/*.scss'),
            ]
        }
    }
};