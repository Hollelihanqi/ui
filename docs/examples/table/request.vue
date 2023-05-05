<template>
  <yto-c-table :columns="columns" :request-api="getList" :data-callback="dataCallback">
    <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template>
  </yto-c-table>
</template>
<script lang="ts" setup>
const tableData = [
  {
    callerCode: "YTO-5464564",
    callerName: "CALL-NAME",
    ownerStr: "LIHANQI",
    status: "已调用",
    lastCallTime: "2023.01.10",
  },
  {
    callerCode: "YTO-5464564",
    callerName: "CALL-NAME",
    ownerStr: "LIHANQI",
    status: "已调用",
    lastCallTime: "2023.01.10",
  },
  {
    callerCode: "YTO-5464564",
    callerName: "CALL-NAME",
    ownerStr: "LIHANQI",
    status: "已调用",
    lastCallTime: "2023.01.10",
  },
];

// 模拟 API 请求接口
const getList = () => {
  return new Promise((resolve) => {
    resolve({
      items: tableData,
      total: 30,
    });
  });
};

// 数据 success callback
const dataCallback = (data) => {
  return data;
};
// 列配置
const columns = [
  {
    label: "调用方编码",
    prop: "callerCode",
  },
  {
    label: "调用方名称",
    prop: "callerName",
  },
  {
    label: "调用方负责人",
    prop: "ownerStr",
  },
  {
    label: "调用状态",
    slot: "callStatus",
  },
  {
    label: "最后调用时间",
    prop: "lastCallTime",
  },
];
</script>
