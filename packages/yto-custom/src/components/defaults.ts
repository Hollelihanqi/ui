import * as components from './components'
import { version } from '../../package.json'
import type { App } from 'vue'

/**
 * 注册组件
 *
 * @param { Object } app 应用实例
 * @returns { Object } 应用实例
 */
const install = (app: App): App => {
  /**
   * 注册组件
   *
   * @see registration https://cn.vuejs.org/guide/components/registration.html
   * @see Array.prototype.forEach() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  */
  const _components = import.meta.glob('./components/*/index.ts', { eager: true });
  Object.entries(components).forEach(([key, value]): void => {
    app.component(key, value)
  })

  /**
   * 注册能够被应用内所有组件实例访问到的全局组件
   *
   * @see app.config.globalProperties https://cn.vuejs.org/api/application.html#app-config-globalproperties
   */

  /**
   * 注册自定义指令组件
   *
   * @see app.directive https://cn.vuejs.org/api/application.html#app-directive
   */
  return app
}

export default {
  version,
  install
}
