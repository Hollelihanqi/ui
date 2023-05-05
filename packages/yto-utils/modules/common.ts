export const isEmpty = (value: any): boolean => {
  if (value == null) {
    // undefined 或 null
    return true;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    // 字符串或数组
    return value.length === 0;
  }
  if (typeof value === "object") {
    // 对象
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const isFunction = (value: any): boolean => {
  return typeof value === "function";
};

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => ReturnType<F> | undefined {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function debounced(...args: Parameters<F>): ReturnType<F> | undefined {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, wait);

    // TypeScript 2.8 及以上版本支持 Promise
    // 可以返回一个 Promise，用于异步获取回调函数的返回值
    // return new Promise<ReturnType<F>>((resolve) => {
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(() => {
    //     resolve(func.apply(this, args));
    //   }, wait);
    // });

    // 如果回调函数没有返回值，可以返回 undefined
    return undefined;
  };
}
