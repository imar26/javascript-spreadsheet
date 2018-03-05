var path = require('path');
var webpack = require('webpack');

var ENV = process.env.ENV || 'dev';
var optimization = {};

if(ENV == 'dev') {
    optimization.minimize = false;
} else if(ENV == 'prod') {
    optimization.minimize = true;
}

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: optimization,
    watch: true
};