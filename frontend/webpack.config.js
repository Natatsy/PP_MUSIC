module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      os: require.resolve("os-browserify/browser"),
      querystring: require.resolve("querystring-es3"),
      http: require.resolve("stream-http"),
      fs: false, // fs is not available in the browser
      net: false,
      tls: false,
    },
  },
};
