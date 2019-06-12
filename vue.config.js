module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    
    svgRule
      .oneOf('external')
      .resourceQuery(/external/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })
      .end()
      .end()
      .oneOf('inline')
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        svgo: {
          // Options: https://github.com/svg/svgo/blob/master/.svgo.yml
          plugins: [{ removeViewBox: false }, { prefixIds: true }, { removeXMLNS: true }]
        }
      })
  },

  
};