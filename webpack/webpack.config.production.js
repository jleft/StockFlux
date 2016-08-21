const webpack = require('webpack');
const WebpackConfig = require('webpack-config').Config;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = new WebpackConfig().extend({
    './webpack/webpack.config.shared.js': sharedConfig => {
        sharedConfig.module.loaders.push({ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] });
        sharedConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }));
        sharedConfig.plugins.push(new CopyWebpackPlugin([{ from: 'src/static' }, { from: 'openfin-config/app.prod.json', to: './app.json' }]));
        return sharedConfig;
    }
}).merge({
    entry: {
        child: ['babel-polyfill', './src/child/index.js'],
        parent: ['babel-polyfill', './src/parent/parent.js']
    },
    output: {
        path: `${__dirname}/../public`
    }
});

module.exports = config;
