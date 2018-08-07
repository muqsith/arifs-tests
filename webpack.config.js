const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    WEBPACK_MODE = process.env.npm_lifecycle_event
    ;

const config = {
    entry: {
            index: path.resolve(__dirname, 'src', 'js', 'index.js'),
            tree: path.resolve(__dirname, 'src', 'js', 'tree.js'),
            positions: path.resolve(__dirname, 'src', 'js', 'positions.js')
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[hash].js'
    },
    devtool: (WEBPACK_MODE === 'build') ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?modules=true&localIdentName=[local]', 'postcss-loader']
                })
            },
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 8888
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'tree.html'),
            filename: 'tree.html',
            chunks: ['tree']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'positions.html'),
            filename: 'positions.html',
            chunks: ['positions']
        }),
        new ExtractTextPlugin('main.css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src', 'images'),
                to: path.resolve(__dirname, 'public', 'images')
            }
        ])
    ]
};

if (WEBPACK_MODE === 'build') {
    config.plugins = [...config.plugins, new UglifyJsPlugin()]
}

module.exports = config;
