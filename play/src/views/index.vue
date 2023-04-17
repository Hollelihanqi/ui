<template>
    <yto-table :columns="columns" :tableData="tableData"  style="padding:30px 16px;">
        <template #callStatus="scope">
            <span>{{ scope.row.status }}</span>
        </template>
    </yto-table>
</template>
<script lang="ts" setup>

const columns = [
  {
    label: "序号",
    type: "index",
    width:80
  },
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

const tableData = [
    {
        callerCode: "YTO-5464564",
        callerName: "CALL-NAME",
        ownerStr: "LIHANQI",
        status: '已调用',
        lastCallTime:"2023.01.10"
    },
    {
        callerCode: "YTO-5464564",
        callerName: "CALL-NAME",
        ownerStr: "LIHANQI",
        status: '已调用',
        lastCallTime:"2023.01.10"
    },
]
</script>