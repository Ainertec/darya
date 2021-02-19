module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'gresp_test',
    },
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    autoStart: false,
  },
};
