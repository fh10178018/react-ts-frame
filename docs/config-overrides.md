## addAntdImport

babel-plugin-import 能够实现 css 和组件按需加载的 babel 插件，通过它实现 antd 的按需加载

## addProxy

添加代理跨域，开发模式下生效

## addCustomize

生产模式下将文件压缩为 gzip 格式，不生产 sourceMap，减少白屏时间

## addFontFileRules

字体文件打包路径统一化

## addImageFileRules

用`url-loader`将小于 10000 Byte 的照片文件，打成 BASE64 格式，写入 Js

## addWebpackAlias

配置路径别名 `@/...`
