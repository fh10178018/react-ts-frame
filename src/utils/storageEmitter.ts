import { isEqual } from "./common";

// setItemEvent 事件用来监听Storage值的变化

interface SEventType {
  newValue: any;
  oldValue: any;
}

export function listenLocalStorage() {
  const storage = window.localStorage;
  const setItem = function (key: string, value: any) {
    return Reflect.set(storageProxy, key, value);
  };
  const getItem = function (key: string) {
    return Reflect.get(storageProxy, key);
  };
  const removeItem = function (key: string) {
    return storageProxy.removeItem(key);
  };
  const key = function (key: number) {
    return storageProxy.key(key);
  };
  const clear = function () {
    return storageProxy.clear();
  };
  const storageProxy = new Proxy(storage, {
    set: function (ls, key, newValue) {
      if (typeof key === "string") {
        var oldValue = storage[key];
        if (!isEqual(oldValue, newValue)) {
          // 判断新旧值，新值更新
          var setItemEvent: CustomEvent<SEventType> = new CustomEvent(
            "setItemEvent",
            {
              detail: {
                newValue,
                oldValue,
              },
            }
          );
          window.dispatchEvent(setItemEvent);
          return Reflect.set(ls, key, newValue);
        }
      }
      return false;
    },
    get: function (ls, prop) {
      // 在执行localstorage.setItem方法时，会出现报错
      // 发现仅仅一步Reflect.get(ls, prop);是不行的
      // 所以单独每个方法拿出来重写了一下
      if (typeof prop === "string" && prop === "setItem") {
        return setItem;
      } else if (prop === "getItem") {
        return getItem;
      } else if (prop === "key") {
        return key;
      } else if (prop === "clear") {
        return clear;
      } else if (prop === "removeItem") {
        return removeItem;
      }
      return Reflect.get(ls, prop);
    },
  });
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    enumerable: true,
    value: storageProxy,
  });
}
