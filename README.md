## 介绍

本项目是基于 React-TypeScript 的通用架子。

贯彻 React 的 everything in JS 理念，降低 js 对 css 文件的依赖，样式使用 `styled-components`。

当然随着技术的革新和个人能力的提升，作者也会不断总结和改善该通用架子。✨

## 主要涉及的技术栈

`styled-components`、`axios`、`React-Typescript`、`customize-cra`

## 安装依赖

`yarn install`

## 启动

- 开发模式：`yarn start`
- 生产模式：`yarn start:prod`

## 打包

- 开发模式：`yarn build`
- 生产模式：`yarn build:prod`

## [tsconfig 相关配置说明 ➹](./docs/tsconfig.md)

- 配置文件：`tsconfig.json`

## [webpack 额外相关配置说明 ➹](./docs/config-overrides.md)

- 配置文件：`config-overrides.js`

## [开发环境 相关参数说明

- [开发环境配置文件 ➹](https://github.com/fh10178018/react-ts-frame/blob/dev/.env)：`.env`
- [生产环境配置文件 ➹](https://github.com/fh10178018/react-ts-frame/blob/dev/.env.prod)：`.env.prod`

## [开发环境下 proxy 代理跨域 ➹](./src/setupProxy.js)

- `/api` 后面拼接接口，一律走跨域请求

## [前端性能检测 ➹](./src/reportWebVitals.ts)

- `CLS`、 `FID`、 `FCP`、 `LCP`、 `TTFB`

## Git Hooks

Commit Message Lint

```
<emoji type>(<scope>): <subject>
```

type: 用于说明 commit 的类别，主要下面几个标识。

| type |      emoji 代码      | 说明                                                        |
| :--: | :------------------: | :---------------------------------------------------------- |
|  🎉  |       `:tada:`       | 初次提交                                                    |
|  🆕  |       `:new:`        | feat：新功能（feature）                                     |
|  🐛  |       `:bug:`        | fix：修补 bug                                               |
|  🔧  |      `:wrench:`      | chore：修改配置文件                                         |
|  💄  |     `:lipstick:`     | style： 格式（不影响代码运行的变动）                        |
|  📝  |       `:memo:`       | docs：文档（documentation）                                 |
|  🔨  |      `:hammer:`      | refactor：重构（即不是新增功能，也不是修改 bug 的代码变动） |
|  ➕  | `:heavy_plus_sign:`  | 增加依赖                                                    |
|  ➖  | `:heavy_minus_sign:` | 减少                                                        |
|  🗑️  |   `:wastebasket:`    | 删除                                                        |
|  🚀  |      `:rocket:`      | 部署功能                                                    |
