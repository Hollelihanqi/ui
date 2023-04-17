
import { isFunction } from "lodash-es";
/**
 * @description: 将MapOptions转换为options
 * @param {any} options
 * @return {*}
 */
export const getOptiops = (options: any) => {
  return isFunction(options.toObject) ? options.toObject() : options;
};
