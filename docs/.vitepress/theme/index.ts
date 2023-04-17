/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-27 16:45:39
 * @LastEditors: 魏春霈
 * @LastEditTime: 2023-04-14 15:52:11
 * @FilePath: \yto-engine\docs\.vitepress\theme\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DefaultTheme from "vitepress/theme";
import DemoBlock from '@ruabick/vitepress-demo-block';
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import '@ruabick/vitepress-demo-block/dist/style.css';
import './var.css'
import YtoCustom, { directives } from '@yto/custom'
import '@yto/custom/dist/es/style.css'

export default {
    ...DefaultTheme,
    enhanceApp: ({ app }) => {
        app.component('demo', DemoBlock);
        app.use(YtoCustom)
        app.use(directives)
        app.use(ElementPlus)
    },
}