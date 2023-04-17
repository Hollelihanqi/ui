<template>
  <ElConfigProvider :locale="locale">
    <div class="table-w">
      <el-table
        ref="tableRef"
        :data="tableData"
        style="width: 100%"
        class="my-table"
        header-cell-class-name="my-header-cell"
        v-bind="$attrs"
      >
        <template v-for="(item, index) in columns" :key="index">
          <el-table-column
            v-if="item.hideCell"
            show-overflow-tooltip
            v-bind="item"
          />
          <el-table-column v-if="item.type" v-bind="item" />
          <el-table-column
            v-if="!item.hideCell && !item.type"
            show-overflow-tooltip
            v-bind="item"
          >
            <template #default="scope">
              <slot
                v-if="item.slot"
                :name="item.slot"
                :index="scope.$index"
                :row="scope.row"
              ></slot>
              <template v-else-if="item.formatText">{{
                item.formatText(scope.row)
              }}</template>
              <template v-else>{{
                item.prop && scope.row[item.prop]
              }}</template>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-pagination
        v-if="!paginationHide"
        class="my-pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleTableChange"
      ></el-pagination>
    </div>
  </ElConfigProvider>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ElConfigProvider } from "element-plus";
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export interface ColumnsItemProps {
  [propsName: string]: any;
}

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  directives: {
    loading: {
      // 指令的定义
      mounted(el: HTMLElement) {
        console.log(el.querySelector(".el-table__empty-text"));
      },
    },
    hoverTip: {
      // 指令的定义
      mounted(el: HTMLElement) {
        console.log(el);
      },
    },
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
    columns: {
      type: Array as PropType<ColumnsItemProps[]>,
      default: () => [],
      required: true,
    },
    paginationHide: {
      // 是否隐藏分页组件
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 30, 50, 100],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    handleChange: {
      type: Function,
      default: null,
    },
  },

  setup(props) {
    const tableRef = ref();
    const load = () => {};
    const handleTableChange = (num: number) => {
      if (props.handleChange && typeof props.handleChange === "function") {
        props.handleChange("page", num);
      }
    };
    const handleSizeChange = (val: number): void => {
      if (props.handleChange && typeof props.handleChange === "function") {
        props.handleChange("size", val);
      }
    };
    const tableClearSelection = () => {
      tableRef.value.clearSelection();
    };
    return {
      handleTableChange,
      handleSizeChange,
      load,
      tableClearSelection,
      tableRef,
      locale: zhCn,
    };
  },
});
</script>
<style lang="scss" scoped>
.table-w {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.my-table {
  flex: 1;
}

.my-table::before {
  display: none;
}

:deep(.el-table__fixed::before) {
  display: none;
}

// 分页
.my-pagination {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.my-pagination :deep(.el-pagination__jump) {
  margin-left: 16px;
}

:deep(.el-input__inner) {
  height: 32px !important;
}

:deep(.el-pager li) {
  width: auto !important;
  min-width: 32px !important;
}

:deep(.el-pagination span:not([class*="suffix"]), .el-pagination button) {
  font-size: 14px;
}

// :deep(.btn-quicknext + li.number) {
//   display: none;
// }
:deep(.el-input__inner:focus) {
  border-color: var(--el-color-primary) !important;
}

.table-w :deep(.el-pager .is-active) {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
  &:hover {
    color: var(--el-color-primary);
  }
}

.table-w :deep(.btn-prev),
.table-w :deep(.btn-next),
.table-w :deep(.el-pager li) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #dcdee0;
  padding: 0;
  margin: 0;
  margin-right: 4px;
  &:hover {
    color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
  }
}

.table-w :deep(.btn-prev),
.table-w :deep(.btn-next) {
  & > i {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
:deep(.el-pagination span:not([class*="suffix"]), .el-pagination button) {
  display: flex;
  font-size: var(--el-pagination-font-size);
  min-width: var(--el-pagination-button-width);
  height: var(--el-pagination-button-height);
  //line-height: var(--el-pagination-button-height);
  line-height: 36px;
  vertical-align: top;
  box-sizing: border-box;
}
</style>
