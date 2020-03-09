const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        index:path.join(__dirname,'src','pages','index','index.js'),
        login:path.join(__dirname,'src','pages','login','login.js'),
        register:path.join(__dirname,'src','pages','register','register.js'),
        square:path.join(__dirname,'src','pages','square','square.js'),
        notFound:path.join(__dirname,'src','pages','404','404.js'),
        error:path.join(__dirname,'src','pages','error','error.js'),
        profile:path.join(__dirname,'src','pages','profile','profile.js'),
        setting:path.join(__dirname,'src','pages','setting','setting.js'),
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname,'dist'),
    },
    module: {rules: [
            {
            test:/\.js$/i,
            exclude: /(node_modules|bower_components)/,
            use:{
                loader:'babel-loader'
            }
        },
            {
            test:/\.css$/i,
            use: ['style-loader','css-loader']
        },
            {
            test:/\.(png|jpe?g|gif)$/i,
            use:'file-loader'
            }]},
    plugins: [
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','index','index.html'),
            filename: "index.html",
            inject: true,
            chunks: ['index','vendor'],
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','login','login.html'),
            filename: "login.html",
            inject: true,
            chunks: ['login','vendor'],
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','register','register.html'),
            filename: "register.html",
            inject: true,
            chunks: ['register','vendor']
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','square','square.html'),
            filename: "square.html",
            inject: true,
            chunks: ['square','vendor']
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','404','404.html'),
            filename: "notFound.html",
            inject: true,
            chunks: ['notFound','vendor']
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','error','error.html'),
            filename: "error.html",
            inject: true,
            chunks: ['error','vendor']
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','profile','profile.html'),
            filename: "profile.html",
            inject: true,
            chunks: ['profile','vendor']
        }),
        new htmlWebpackPlugin({template: path.join(__dirname,'src','pages','setting','setting.html'),
            filename: "setting.html",
            inject: true,
            chunks: ['setting','vendor']
        }),

    ],
    devServer: {
        contentBase:path.join(__dirname,'public')
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name:"vendor"
        }
    }

};
