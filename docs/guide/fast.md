# 安装

## pnpm

使用快速的，节省磁盘空间的包管理工具 [pnpm](https://pnpm.io/zh) 进行安装

```shell
pnpm add --save-dev @yto/custom
```

## 完整引入

在 `main.ts` 中引入下面内容

```ts
import { createApp } from "vue";
import App from "./App.vue";

import YtoCustom from "@yto/custom";
import "@yto/custom/dist/style.css";

createApp(App).use(YtoCustom).mount("#app");
```
