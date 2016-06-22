const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const sharedConfig = require('./webpack.config.shared.js');

const config = Object.assign({}, sharedConfig);


config.entry = {
    test: ['./test/index.js']
};
config.output = {
    filename: './[name]_bundle.js'
};
config.target = 'node';
config.externals = [nodeExternals()];
config.output.path = `${__dirname}/../public`;
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"test"'
    })
);

config.resolveLoader = {
    packageMains: ['json-loader']
};

config.module = {
    loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.less$/, loader: 'null-loader' },
        { test: /\.css$/, loader: 'null-loader' },
        { test: /\.(png|jpg)$/, loader: 'null-loader' },
        { test: /\.svg$/, loader: 'null-loader' },
        { test: /\.eot$/, loader: 'null-loader' },
        { test: /\.ttf$/, loader: 'null-loader' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'null-loader' },
        { test: /\.json$/, loader: 'json' }
    ]
};

module.exports = config;
