import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "@yto/utils",
      fileName: "index",
      // 导出模块格式
      formats: ["es"],
    },
  },
});
