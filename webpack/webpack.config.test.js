const webpack = require('webpack');
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

module.exports = config;
