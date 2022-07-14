const path= require('path')

module.exports={
    entry: [__dirname, "./static/videobackend/js/index.js"],
    output:{
        filename:"bundledIndex.js",
        path: path.resolve(__dirname, "static/videobackend/js/build")
    },
    module: {
        rules:[{
            test: /\.js$/,
            // exclude:"node_modules",
            use:"babel-loader",
        }]
    }
}