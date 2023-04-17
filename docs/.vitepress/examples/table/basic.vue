<template>
  <yto-table
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :current-page="paginationParams.pageNum"
    :page-size="paginationParams.pageSize"
    :handle-change="handleTableChange"
  >
    <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template>
  </yto-table>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const total = 60;
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
});

// 分页选择
const handleTableChange = async (type: string, num: number) => {
  type === "page" && (paginationParams.value.pageNum = num);
  if (type === "size") {
    //页码重置
    paginationParams.value.pageNum = 1;
    paginationParams.value.pageSize = num;
  }
};

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
</script>
