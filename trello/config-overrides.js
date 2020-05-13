const {
    addDecoratorsLegacy,
    disableEsLint,
    override,
    addWebpackAlias,
} = require("customize-cra");

const path = require('path');

module.exports = {
    webpack: override(
        disableEsLint(),
        addDecoratorsLegacy(),
        addWebpackAlias({
          '~': path.resolve(__dirname, './src')
        }),
    ),
};
