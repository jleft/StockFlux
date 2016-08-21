const path = require('path');

if (!process.env.NODE_ENV) {
    throw new Error('"process.env.NODE_ENV" must be set to determine which webpack config to use.');
}

module.exports = require(path.join(__dirname, `/webpack.config.${process.env.NODE_ENV}.js`)); // eslint-disable-line global-require
