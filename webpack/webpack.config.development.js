const webpack = require('webpack');
const WebpackConfig = require('webpack-config').Config;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = new WebpackConfig().extend({
    './webpack/webpack.config.shared.js': sharedConfig => {
        sharedConfig.module.loaders.push({ test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] });
        sharedConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        sharedConfig.plugins.push(new CopyWebpackPlugin([{ from: 'src/static' }, { from: 'openfin-config/app.dev.json', to: './app.json' }]));
        return sharedConfig;
    }
}).merge({
    entry: {
        child: ['babel-polyfill', './src/child/index.js', 'webpack-dev-server/client?http://localhost:5000', 'webpack/hot/only-dev-server'],
        parent: ['babel-polyfill', './src/parent/parent.js', 'webpack-dev-server/client?http://localhost:5000', 'webpack/hot/only-dev-server']
    },
    output: {
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './public',
        hot: true,
        port: 5000,
        stats: {
            chunks: false
        }
    }
});

module.exports = config;
