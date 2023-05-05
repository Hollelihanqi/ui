<template>
  <!-- 查询表单 card -->
  <ElConfigProvider :locale="locale">
    <SearchForm
      v-show="isShowSearch"
      :search="search"
      :reset="reset"
      :search-param="searchParam"
      :columns="searchColumns"
      :col-config="searchCol"
    />

    <!-- 表格内容 card -->
    <div class="card table" style="display: flex">
      <!-- 表格头部 操作按钮 -->
      <div class="table-header">
        <div class="header-button-lf">
          <slot
            name="tableHeader"
            :selected-list-ids="selectedListIds"
            :select-list="selectedList"
            :is-selected="isSelected"
          ></slot>
        </div>
        <div v-if="toolButton" class="header-button-ri">
          <el-button :icon="Refresh" circle @click="getTableList"> </el-button>
          <el-button v-if="columns.length" :icon="Printer" circle @click="handlePrint"> </el-button>
          <el-button v-if="columns.length" :icon="Operation" circle @click="openColSetting"> </el-button>
          <el-button v-if="searchColumns.length" :icon="Search" circle @click="isShowSearch = !isShowSearch">
          </el-button>
        </div>
      </div>
      <!-- 表格主体 -->
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        :data="tableData"
        :border="border"
        :row-key="getRowKeys"
        @selection-change="selectionChange"
      >
        <!-- 默认插槽 -->
        <slot></slot>
        <template v-for="item in tableColumns" :key="item">
          <!-- selection || index -->
          <el-table-column
            v-if="item.type == 'selection' || item.type == 'index'"
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type == 'selection'"
          >
          </el-table-column>
          <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
          <el-table-column
            v-else-if="item.type == 'expand'"
            v-slot="scope"
            v-bind="item"
            :align="item.align ?? 'center'"
          >
            <component :is="item.render" v-if="item.render" :row="scope.row"> </component>
            <slot v-else :name="item.type" :row="scope.row"></slot>
          </el-table-column>
          <!-- other 循环递归 -->
          <TableColumn v-else :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" :row="scope.row"></slot>
            </template>
          </TableColumn>
        </template>
        <!-- 无数据 -->
        <template #empty>
          <div class="table-empty">
            <!-- <img src="@/assets/images/notData.png" alt="notData" /> -->
            <div>暂无数据</div>
          </div>
        </template>
      </el-table>
      <!-- 分页组件 -->
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </div>
  </ElConfigProvider>
  <!-- 列设置 -->
  <!-- <ColSetting v-if="toolButton" ref="colRef" v-model:colSetting="colSetting" /> -->
</template>

<script setup lang="ts" name="CProTable">
import { ref, watch, computed, provide } from "vue";
import { filterEnum } from "./utils";
import { useTable } from "./hooks/useTable";
import { useSelection } from "./hooks/useSelection";
import { BreakPoint } from "./components/Grid/interface";
import { ColumnProps } from "./interface";
import { ElTable, TableProps, ElConfigProvider } from "element-plus";
import { Refresh, Printer, Operation, Search } from "@element-plus/icons-vue";
import SearchForm from "./components/SearchForm/index.vue";
import Pagination from "./components/Pagination.vue";
import ColSetting from "./components/ColSetting.vue";
import TableColumn from "./components/TableColumn.vue";
// import printJS from "print-js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const locale = zhCn;
// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 是否显示搜索模块
const isShowSearch = ref<boolean>(true);

interface AnyObj {
  [propsName: string]: any;
}
interface ProTableProps extends TableProps<AnyObj> {
  columns: ColumnProps[]; // 列配置项
  requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
  pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}，必须是 reactive 包裹的）
  border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
  selectId?: string; // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: false,
  toolButton: false,
  selectId: "id",
  title: "",
  dataCallback: undefined,
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection(props.selectId);

// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
} = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 监听页面 initParam 改化，重新获取表格数据
watch(
  () => props.initParam,
  () => {
    getTableList();
  },
  { deep: true }
);

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide("enumMap", enumMap);

// 扁平化 columns && 处理 tableColumns 数据
const flatColumnsFunc: any = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);

    // 给每一项 column 添加 isShow && isFilterEnum 属性
    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    if (!col.enum) return;
    // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
    if (typeof col.enum !== "function") return enumMap.value.set(col.prop!, col.enum);
    const { data } = await col.enum();
    enumMap.value.set(col.prop!, data);
  });
  return flatArr.filter((item) => !item._children?.length);
};

// 扁平 columns
const flatColumns = ref<ColumnProps[]>([]);
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项 && 处理搜索排序
const searchColumns = flatColumns.value
  .filter((item) => item.search?.el)
  .sort((a, b) => (b.search?.order ?? 0) - (a.search?.order ?? 0));

// 设置搜索表单的默认值
searchColumns.forEach((column) => {
  if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
    searchInitParam.value[column.search.key ?? column.prop!] = column.search?.defaultValue;
  }
});

// 列设置
const colRef = ref();
// 过滤掉不需要设置显隐的列（页面直接隐藏的列不需要列设置）
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const colSetting = tableColumns.value!.filter((item: ColumnProps) => {
  return (
    item.isShow &&
    item.type !== "selection" &&
    item.type !== "index" &&
    item.type !== "expand" &&
    item.prop !== "operation"
  );
});
const openColSetting = () => {
  colRef.value.openColSetting();
};

// 处理打印数据（把后台返回的值根据 enum 做转换）
const printData = computed(() => {
  let printDataList = JSON.parse(JSON.stringify(selectedList.value.length ? selectedList.value : tableData.value));
  let colEnumList = flatColumns.value!.filter((item) => item.enum);
  colEnumList.forEach((colItem) => {
    printDataList.forEach((tableItem: any) => {
      tableItem[colItem.prop!] = filterEnum(
        tableItem[colItem.prop!],
        enumMap.value.get(colItem.prop!),
        colItem.fieldNames
      );
    });
  });
  return printDataList;
});

// 打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）
const handlePrint = () => {
  // printJS({
  //   printable: printData.value,
  //   header:
  //     props.title &&
  //     `<div style="display: flex;flex-direction: column;text-align: center"><h2>${props.title}</h2></div>`,
  //   properties: flatColumns
  //     .value!.filter(
  //       (item) =>
  //         item.isShow &&
  //         item.type !== "selection" &&
  //         item.type !== "index" &&
  //         item.type !== "expand" &&
  //         item.prop !== "operation"
  //     )
  //     .map((item: ColumnProps) => {
  //       return {
  //         field: item.prop,
  //         displayName: item.label,
  //       };
  //     }),
  //   type: "json",
  //   gridHeaderStyle:
  //     "border: 1px solid #ebeef5;height: 45px;font-size: 14px;color: #232425;text-align: center;background-color: #fafafa;",
  //   gridStyle:
  //     "border: 1px solid #ebeef5;height: 40px;font-size: 14px;color: #494b4e;text-align: center",
  // });
};

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
  element: tableRef,
  tableData,
  searchParam,
  pageable,
  reset,
  getTableList,
  clearSelection,
});
</script>
<style lang="scss">
@import "./style.scss";
</style>
