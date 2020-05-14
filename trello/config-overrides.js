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
    devServer: (configFunction) => (proxy, allowedHost) => {
      const { proxy : propertiesProxy } = require('./config/devServer.properties.js');
      let targetProxy = proxy;

      if (!targetProxy && propertiesProxy && typeof propertiesProxy === 'object') {
        targetProxy = Object.entries(propertiesProxy).reduce((prev, [contextKey, context]) => ({
          ...prev,
          [contextKey]: {
            ...context,
            // target과 같은 레벨
            changeOrigin: 'changeOrigin' in context ? context.changeOrigin : true,
            secure: 'secure' in context ? context.secure : false,
          },
        }), {});
      }
      return configFunction(targetProxy, allowedHost);
    }
};
