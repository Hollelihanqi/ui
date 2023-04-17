/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-24 17:52:24
 * @LastEditors: 魏春霈
 * @LastEditTime: 2023-04-14 10:59:36
 * @FilePath: \yto-engine\docs\docs\.vitepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AErts
 */

import { defineConfig } from "vitepress";
import { applyPlugins } from "@ruabick/md-demo-plugins";

export default defineConfig({
  title: "技术平台部-业务组件库",
  lastUpdated: true,
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    sidebar: {
      "/": [
        {
          text: "快速开始",
          link: "/.vitepress/guide/fast",
        },
        {
          text: "组件",
          items: [
            {
              text: "ProTable",
              link: "/.vitepress/examples/pro-table/index.md",
            },
            {
              text: "BaseTable",
              link: "/.vitepress/examples/table/index.md",
            },
            {
              text: "BaseMenu",
              link: "/.vitepress/examples/menu/index.md",
            },
            {
              text: "Echart",
              link: "/.vitepress/examples/echart/index.md",
            }
          ],
          collapsible: true,
          collapsed: false,
        },
        {
          text: "指令",
          link: "/.vitepress/examples/directives/index.md",
          items: [
            {
              text: "拖拽指令",
              link: "/.vitepress/examples/directives/drag/index.md",
            },
          ],
        },
      ],
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    lastUpdated: true,
  },
  /**
   * 自定义 markdown 解析器
   *
   * @see markdown https://vitepress.vuejs.org/config/app-configs#markdown
   */
  markdown: {
    /**
     * 配置 Markdown-it 实例
     *
     * @param { Object } md markdown 实例
     */
    config: (md) => {
      applyPlugins(md);
    },
  },
});
