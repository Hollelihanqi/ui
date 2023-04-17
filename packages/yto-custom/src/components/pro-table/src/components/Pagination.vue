<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-28 20:59:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-14 16:06:47
 * @FilePath: \xlfk-vite-vue3\src\components\ProTable\components\Pagination.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 分页组件 -->
  <el-pagination
    :current-page="pageable.page"
    :page-size="pageable.size"
    :page-sizes="[10, 20, 50, 100]"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageable.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts" name="pagination">
interface Pageable {
  page?: number;
  size?: number;
  total: number;
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
