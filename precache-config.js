var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
module.exports = {
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/], // <-- necessary for Firebase OAuth
  stripPrefix: 'dist/',
  root: 'dist/',
  plugins: [
    new SWPrecacheWebpackPlugin({
      filename: 'service-worker.js',
      staticFileGlobs: [
        'dist/index.html',
        'dist/**.js',
        'dist/**.css',
        'dist/assets/**.*'
      ],
      stripPrefix: 'assets/',
      mergeStaticsConfig: true // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
    }),
  ]/*,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/lein-haz.github.io\/asite\//,
      handler: 'cacheFirst',
      options: {
        maxEntries: 3
      }
    }, {
      urlPattern: /\/home\//,
      handler: 'fastest',
      options: {
        maxEntries: 3
      }
    }
  ]*/
};
