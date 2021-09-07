const {
  override,
  fixBabelImports,
  addPostcssPlugins,
  addWebpackAlias,
  addWebpackModuleRule,
} = require("customize-cra");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");
const isProduction = process.env.NODE_ENV === "production";
const isMobileH5 = false; // 是否是手机H5项目
let useAntd = true;
try {
  require("antd");
} catch (ex) {
  useAntd = false;
}

// 打包配置
const addCustomize = () => (config) => {
  if (isProduction) {
    // 生产模式下，关闭sourceMap，且删除map文件
    config.devtool = false;
    // 配置打包后的文件位置
    // config.output.path = __dirname + "../dist";

    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]", //压缩后的文件策略
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240, // 对10kb以上数据进行压缩
        minRatio: 0.8,
      })
    );
  }
  config.output.publicPath = "./";
  return config;
};

// 手机样式适配问题，px自动转为rem
const addPxToRem = () =>
  isMobileH5
    ? addPostcssPlugins([
        require("postcss-pxtorem")({
          rootValue: 75,
          propList: ["*"],
          minPixelValue: 2, // 最小像素值
          selectorBlackList: ["am-"], // 选择器的黑名单，am-开头
        }),
      ])
    : undefined;

// font 文件配置
const addFontFileRules = () =>
  addWebpackModuleRule({
    test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
    // 排除 node_modules 目录下的文件
    exclude: /(node_modules)/,
    loader: "file-loader",
    options: {
      limit: 10000,
      // 定义打包完成后最终导出的文件路径
      outputPath: "css/fonts/",
      // 文件的最终名称
      name: "[name].[hash:7].[ext]",
    },
  });

const addImageFileRules = () =>
  addWebpackModuleRule({
    // 小于10k的图片在img下不会有图片文件，而是直接把图片的base64值写到html引入图片的地方
    // 大于10k的图片会放在img下，需要的时候通过http请求下载
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: "images/[name].[hash:7].[ext]",
    },
  });

//  antd的按需加载
const addAntdImport = () =>
  useAntd
    ? fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
      })
    : undefined;

module.exports = override(
  addAntdImport(),
  addImageFileRules(),
  addFontFileRules(),
  fixBabelImports("react-use", {
    libraryName: "react-use",
    libraryDirectory: "lib",
    camel2DashComponentName: false,
  }),
  addPxToRem(),
  addCustomize(),
  addWebpackAlias({
    //配置路径别名
    "@": path.resolve(__dirname, "src"),
  })
);
