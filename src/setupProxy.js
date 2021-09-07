const { createProxyMiddleware } = require("http-proxy-middleware");

// 当后端没有设置跨域时，配置前端跨域
if (process.env.NODE_ENV === "development") {
  module.exports = function (app) {
    app.use(
      createProxyMiddleware("/api", {
        target: process.env.REACT_APP_HTTP_BASEURL,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          "^/api": "",
        },
      })
    );
  };
}
