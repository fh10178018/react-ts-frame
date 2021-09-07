## 1. tsconfig 配置详解

### 1.1 target

指定 Typescript 文件编译后生成的 javascript 文件里的语法应该遵循 JavaScript 的版本。

> `ES5`，ES5 目前所有浏览器都适配，所以不推荐 ES6 及以上版本。

### 1.2 module

默认值取决于 target,用来指定输出后文件的模块定义规范。其中主要分为一下两种。

| ES module          | commonjs       |
| ------------------ | -------------- |
| 只读引用           | 值的拷贝       |
| **编译时**输出接口 | **运行时**加载 |
| 异步加载           | 同步加载       |

> `esnext`，ES5 目前所有浏览器都适配，所以不推荐 ES6 及以上版本。

### 1.3 esModuleInterop

ESM 和 CJS 两者之间相互导入导出本身是不支持的。所以要通过 babel 先将 ESModule 同意。开启 allowSyntheticDefaultImports。

> `true`，ES5 目前所有浏览器都适配，所以不推荐 ES6 及以上版本。

### 1.4 lib

编译时引入的功能库，和 target 有关。

> ["dom", "dom.iterable", "esnext"]，由于程序在浏览器中，需要识别 window 和 document 等，因此需要"dom","esnext" 是一个 JavaScript 库，可以将 ES6 草案规范语法转成今天的 JavaScript 语法。

### 1.5 allowJs

是否允许编译 JS、JSX 文件

> `true` 允许编译 JS、JSX 文件

### 1.6 checkJs

是否允许检查 JS 文件，JS 文件也要注意声明

> `false 或不填` 有些 JS 文件，无需声明

### 1.7 jsx

编译阶段用来控制 jsx 文件转译生成 JavaScript 的输出方式，当然 ts 中指的就是`.tsx`

| 模式         | 输入      | 输出                                           | 输出文件扩展名 |
| ------------ | --------- | ---------------------------------------------- | -------------- |
| react        | `<div />` | `React.createElement("div")`                   | .js            |
| react-jsx    | `<div />` | `_jsx("div", { children: undefined }, void 0)` | .js            |
| preserve     | `<div />` | `<div />`                                      | .jsx           |
| react-native | `<div />` | `<div />`                                      | .js            |

> `"react-jsx"` React17 新出，使用它

### 1.8 skipLibCheck

是否跳过检查，开启会节省编译期间的时间，但会牺牲类型系统的准确性。

> `true` 推荐为 true,便于开发

### 1.9 allowSyntheticDefaultImports

用来指定允许从没有默认导出的模块中默认导入。

> `不填` esModuleInterop === true,默认开启为 true

### 1.10 **strict** 严格模式检查选项

#### 1.10.1 strict

strict 为 true 会同时开启下面所有严格类型属性的检查

> `true` 消除隐患威胁，使调试更容易

#### 1.10.2 noImplicitAny

如果没有明确声明类型，编译器会默认为 any，而没有明确的类型会报错

> `不填` strict 选项决定开启

#### 1.10.3 strictNullChecks

null 和 undefined 不能赋予给非这两种类型的值

> `不填` strict 选项决定开启

#### 1.10.4 strictFunctionTypes

函数参数双向协变检查

> `不填` strict 选项决定开启

#### 1.10.5 strictBindCallApply

对 bind、call 和 apply 函数的参数进行严格检测

> `不填` strict 选项决定开启

#### 1.10.6 strictPropertyInitialization

会检查类的非 undefined 属性是否已经在构造函数里初始化

> `不填` strict 选项决定开启

#### 1.10.7 noImplicitThis

this 为 any 类型时，会提示错误

> `不填` strict 选项决定开启

#### 1.10.8 alwaysStrict

在编译之后的 js 文件中加入"use strict",以严格模式检查每个模块

> `不填` strict 选项决定开启

### 1.11 额外的选项

#### 1.11.1 noUnusedParameters

函数参数声明但没有使用的时候就会报错

> `false or 不填` 比如 **catch(err) {}** 的使用

#### 1.11.2 forceConsistentCasingInFileNames

设置为 true 时，在引用文件时，强制区分文件的名称大小写

```javascript
import Hello from "./a1.js"; // 实际文件名称为A1.js
```

> `true` 规范项目下名称书写

#### 1.11.3 noFallthroughCasesInSwitch

严格校验 switch-case 的语法，不允许 switch 语句中的 case 穿透，如下代码所示：

```javascript
switch (
  c2 //如果是a e i o u 当中的一个会一直向下运行直到碰到break；
) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log("元音");
    break;
  case "y":
  case "w":
    console.log("半元音");
    break;
  default:
    console.log("辅音");
}
```

> `false` 穿透有穿透的好处，注意使用就行

#### 1.11.4 noUnusedLocals

检查是否有定义了但是没有使用的变量

> `false 或 不填` import React from "react"; 会提示报错，但是这是必要的。

### 1.12 sourceMap

编译时是否生成.map 文件，主要方便于调试工具，在生产模式下，建议删除掉

> `true`
