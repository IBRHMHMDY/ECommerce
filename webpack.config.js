var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

    entry: {
      app: './src/index.js'
    },

    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '',
        filename: 'main.js',

    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 2021,
        writeToDisk: true,
        open: true
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                  
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "images",
                    }
                  },
                ],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts',
                        esModule: false,
                        },
                    },
                ],
            },
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                  exposes: ["$", "jQuery"],
                },
            },
           

        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin({filename: "css/style.css"}),

        new OptimizeCssAssetsPlugin({}),

    ],

};