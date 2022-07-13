const path= require('path')

module.exports={
    entry: "./static/js/index.js",
    output:{
        filename:"bundledIndex",
        path:"./static/js"
    },
    module: {
        rules:[{
            test: /\.js$/,
            exclude:"node_modules",
            use:"babel-loader",
        }]
    }
}