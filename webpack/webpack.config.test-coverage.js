const webpack = require('webpack');
const WebpackConfig = require('webpack-config').Config;

const config = new WebpackConfig().extend({
    './webpack/webpack.config.shared.js': sharedConfig => {
        delete sharedConfig.output; // eslint-disable-line no-param-reassign
        delete sharedConfig.entry; // eslint-disable-line no-param-reassign
        delete sharedConfig.output; // eslint-disable-line no-param-reassign
        delete sharedConfig.module.loaders; // eslint-disable-line no-param-reassign
        sharedConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }));
        return sharedConfig;
    }
}).merge({
    module: {
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
    }
});

module.exports = Object.assign({}, config);
