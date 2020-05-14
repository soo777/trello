const devServerProperties = {
  proxy: {
    // mes-starer-service를 MicroServiceName으로 수정
    '/api': {
      // pathRewrite: {'^/api': ''},
      target: 'http://localhost:8080'             // to json-server
    },
  },
};

module.exports = devServerProperties;
