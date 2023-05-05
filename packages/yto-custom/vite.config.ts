import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import dts from "vite-plugin-dts";
import { copyFileSync } from "fs";
import { readFile } from "fs/promises";
//@ts-ignore
import { outputFile } from "fs-extra/esm";
//@ts-ignore
import { visualizer } from "rollup-plugin-visualizer";
//@ts-ignore
import MoveFile from "./vite-plugin-move";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      dts: "types/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "types/.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
    vueSetupExtend(),
    // dts({
    //   skipDiagnostics: true /** 是否跳过类型诊断 */,
    //   staticImport: true /** 是否将动态引入转换为静态 */,
    //   outputDir: ['./dist/es']/** 可以指定一个数组来输出到多个目录中 */,
    //   insertTypesEntry: true /** 是否生成类型声明入口 */,
    //   cleanVueFileName: true /** 是否将 '.vue.d.ts' 文件名转换为 '.d.ts' */,
    //   copyDtsFiles: true /** 是否将源码里的 .d.ts 文件复制到 outputDir */,
    //   include: ['./packages/yto-custom'] /** 手动设置包含路径的 glob */,
    //   // exclude:['./src/directives'],
    //   // /** 构建后回调钩子 */
    //   // afterBuild: (): void => {
    //   //   move()
    //   // }
    // }),
    MoveFile(() => {
      move();
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名路径
    },
  },
  build: {
    target: "modules", // 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。
    minify: true,
    emptyOutDir: false,
    outDir: resolve(__dirname, "./dist") /** 指定输出路径 */,
    lib: {
      entry: "./src/index.ts",
      name: "YtoCustom",
    },
    rollupOptions: {
      external: ["vue", "vue-router", "echarts", "axios", "@vue/runtime-core"],
      output: [
        {
          name: "YtoCustom",
          format: "es",
          dir: "dist/es",
          // 输出后的文件名
          entryFileNames: "index.js",
          exports: "named",
        },
      ],
    },
  },
});

/** 打包结束之后将一些静态文件进行移入 */
const move = (): void => {
  readFile("./package.json").then((data: any) => {
    const json = JSON.parse(data);
    json.main = "es/index.js";
    json.module = "es/index.js";
    // json.types = "es/index.d.ts"
    json.files = ["es/"];
    delete json.scripts;
    outputFile(path.resolve("./dist", `package.json`), JSON.stringify(json), "utf-8");
    const files = [
      { input: "./README.md", outDir: "dist/README.md" },
      { input: "./LICENSE", outDir: "dist/LICENSE" },
    ] as const;

    files.forEach((item): void => {
      copyFileSync(item.input, item.outDir);
    });
    console.warn("\n" + `${json.name} ${json.version} 版本打包成功! ` + "\n");
  });
};
