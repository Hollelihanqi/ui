<template>
  <yto-menu :menus="testMenus" />
</template>
<script lang="ts" setup>
import { guid } from "@yto/utils";
// import ExtendMenu from '../../../../yto-basal/src/extend-menu/src/index2.vue'
const testMenus = [
  {
    code: "XTHYDFX_YHXWFXLY_ML_YHXWFX_XTYY",
    name: "系统运营",
    path: "",
    icon: "yto-icon-B-X-survey",
    level: 2,
    parent: "YHXWFX_YHXWFX_ML_YHXWFX",
    children: [
      {
        code: "XTHYDFX_YHXWFXLY_CD_XTYY_CDGL",
        name: "菜单管理",
        path: "/menu-management",
        icon: "",
        level: 3,
        parent: "XTHYDFX_YHXWFXLY_ML_YHXWFX_XTYY",
        children: null,
      },
      {
        code: "XTHYDFX_YHXWFXLY_CD_XTYY_XTFZ",
        name: "系统分组",
        path: "/system-group",
        icon: "",
        level: 3,
        parent: "XTHYDFX_YHXWFXLY_ML_YHXWFX_XTYY",
        children: null,
      },
      {
        code: "XTHYDFX_YHXWFXLY_CD_XTYY_DLRZCX",
        name: "登录日志",
        path: "/login-log",
        icon: "",
        level: 3,
        parent: "XTHYDFX_YHXWFXLY_ML_YHXWFX_XTYY",
        children: null,
      },
      {
        code: "XTHYDFX_YHXWFXLY_CD_XTYY_RZCX",
        name: "操作日志",
        path: "/log-management",
        icon: "",
        level: 3,
        parent: "XTHYDFX_YHXWFXLY_ML_YHXWFX_XTYY",
        children: null,
      },
      {
        code: "XTHYDFX_YHXWFXLY_CD_XTYY_MKGL",
        name: "应用管理",
        path: "/module-management",
        icon: "",
        level: 3,
        parent: "XTHYDFX_YHXWFXLY_ML_YHXWFX_XTYY",
        children: null,
      },
    ],
  },
  {
    code: "YHXWFX_YHXWFX_ML_YHXWFX_XTFW",
    name: "系统服务",
    path: "",
    icon: "yto-icon-B-X-data_kanban",
    level: 2,
    parent: "YHXWFX_YHXWFX_ML_YHXWFX",
    children: [
      {
        code: "YHXWFX_YHXWFXLY_CD_XTFW_FWTYJLCX",
        name: "服务调用记录查询",
        path: "/service-call-record",
        icon: "",
        level: 3,
        parent: "YHXWFX_YHXWFX_ML_YHXWFX_XTFW",
        children: null,
      },
      {
        code: "YHXWFX_YHXWFXLY_CD_XTFW_FWTYQKBG",
        name: "服务调用情况报告",
        path: "/service-call-report",
        icon: "",
        level: 3,
        parent: "YHXWFX_YHXWFX_ML_YHXWFX_XTFW",
        children: null,
      },
      {
        code: "YHXWFX_YHXWFXLY_CD_XTFW_FWFGQKBG",
        name: "服务覆盖情况报告",
        path: "/service-coverage-report",
        icon: "",
        level: 3,
        parent: "YHXWFX_YHXWFX_ML_YHXWFX_XTFW",
        children: null,
      },
    ],
  },
  {
    code: "YHXWFX_YHXWFX_ML_YHXWFX_YWYY",
    name: "业务应用",
    path: "",
    icon: "yto-icon-B-X-framework",
    level: 2,
    parent: "YHXWFX_YHXWFX_ML_YHXWFX",
    children: [
      {
        code: "YHXWFX_YHXWFXLY_CD_YWYY_YHFWLB",
        name: "用户访问列表",
        path: "/operationa-analysis/visit-user-list",
        icon: "",
        level: 3,
        parent: "YHXWFX_YHXWFX_ML_YHXWFX_YWYY",
        children: null,
      },
      {
        code: "YHXWFX_YHXWFXLY_CD_YWYY_DTBFLB",
        name: "动态播放列表",
        path: "/operationa-analysis/dynamic-play-list",
        icon: "",
        level: 3,
        parent: "YHXWFX_YHXWFX_ML_YHXWFX_YWYY",
        children: null,
      },
    ],
  },
];
</script>
