module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    }
  },
  lintOnSave: false,
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {}
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/tom2/'
      : '/',
  pwa: {
    name: 'tom2',
    workboxOptions: {
      include: [
        /\.html$/,
        /\.js$/,
        /\.css$/,
        /\.(?:ico|png|svg|jpg|jpeg|mp4|mp3|wav)$/
      ],
      maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
    }
  }
};