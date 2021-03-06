/**
 * 通用方法
 * 目前收录：useThrottle、useDebounce、isValidKey、isObject、isEqual(深度比较)、listenLocalStorage
 */

import { useCallback, useEffect, useRef, useState } from "react";

// 节流
export function useThrottle(func: Function, wait: number) {
  const [previous, setPrevious] = useState(0);
  return useCallback(
    function (this: any) {
      const now = Date.now();
      const context = this;
      const arg = arguments;
      if (now - previous > wait) {
        setPrevious(now);
        func.apply(context, arg);
      }
    },
    [func, previous, wait]
  );
}
interface IPoint {
  func: Function;
  timer: any;
}
// 当事件触发后，一定时间内不再触发该事件，而如果重新触发，就会重新开始延长，debounce也分为两种，在延长周期前生效，和周期末生效
export function useDebounce(
  func: Function,
  wait: number,
  isImmediate: boolean = false,
  deep = []
) {
  let a: IPoint = { func, timer: null };
  const { current } = useRef(a);
  useEffect(() => {
    current.func = func;
  }, [current, func]);
  return useCallback(
    function (this: any) {
      const context = this;
      const args = arguments;
      if (current.timer) clearTimeout(current.timer); // 清除之前的时间延迟执行
      if (isImmediate) {
        if (!current.timer) {
          func.apply(context, args);
          current.timer = null;
        }
        current.timer = setTimeout(() => {
          current.timer = null;
        }, wait);
      } else {
        current.timer = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      }
    },
    [current, func, isImmediate, wait]
  );
}

//判断是否是对象
export function isObject(obj: any) {
  return typeof obj === "object" && obj !== null;
}

export function isEqual(obj1: any, obj2: any) {
  //如果传入的不是对象，那就直接比较并且返回
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  //如果传入的两个对象为同一个，那直接返回true
  if (obj1 === obj2) {
    return true;
  }
  //如果两个对象的key的长度不一致，返回false
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  //递归比较
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  return true;
}

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  if (key === undefined) return false;
  return key in object;
}

// 判断属性类型
// Object.prototype.toString可以用object的toString判断
// 从而避开如Array的toString方法
// var obj = {a: 1};
// obj.toString(); //"[object Object]"
export function getType(obj: any) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  const key = toString.call(obj);
  if (obj instanceof Element) {
    return "element";
  }
  return map[key as keyof typeof map];
}

// 递归方法处理deepClone，主要是处理数组和对象类型
export function deepClone(data: any) {
  const type = getType(data);
  const stringMap = {
    array: function () {
      const obj: Array<any> = [];
      for (let i = 0; i < data.length; i++) {
        obj.push(deepClone(i));
      }
      return obj;
    },
    object: function () {
      type ObjPropType = {
        [key: string]: any;
      };
      const obj: ObjPropType = {};
      for (let key in data) {
        obj[key] = deepClone(data[key]);
      }
      return obj;
    },
  };
  if (type && isValidKey(type, stringMap)) {
    const func = stringMap[type as keyof typeof stringMap];
    if (func) return func();
  }
  return data;
}
