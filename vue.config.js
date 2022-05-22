const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    productionSourceMap: false,
    chainWebpack(config) {
        config.plugins.delete('prefetch')
        config.plugin('CompressionPlugin').use(CompressionPlugin)
    }
}
