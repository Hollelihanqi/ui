// export default {
//     install(App: any) {
//         const components = import.meta.glob('./components/*/src/index.vue', { eager: true });
//         console.log(components)
//         Object.entries(components).forEach(([path, definition]: any) => {
//             // 根据文件名获取组件名
//             console.log(definition)
//             let componentName = path.split('/')[2]
//             componentName = 'yto-' + componentName
//             // 在 vue 实例上注册组件
//             App.component(componentName, definition.default)
//         })
//     }
// }

import installer from "./defaults";

export * from "./component";
export * from "./_utils";
export const install = installer.install;
export const version = installer.version;

export default installer;
