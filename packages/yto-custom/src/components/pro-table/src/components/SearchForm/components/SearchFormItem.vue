<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-16 17:38:54
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-16 17:42:14
 * @FilePath: \xlfk-vite-vue3\src\components\ProTable\components\SearchForm\components\SearchFormItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <component
    :is="`el-${column.search.el}`"
    v-if="column.search?.el && !column.search.remote"
    v-bind="column.search.props"
    v-model="searchParam[column.search.key ?? column.prop!]"
    :data="column.search?.el === 'tree-select' ? columnEnum : []"
    :placeholder="placeholder(column)"
    :clearable="clearable(column)"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  >
    <template v-if="column.search.el === 'select' && !column.search.remote">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames().label]"
        :value="col[fieldNames().value]"
      ></component>
    </template>
    <slot v-else></slot>
  </component>
  <RemoteSelect
    v-if="column.search?.remote"
    v-model="searchParam[column.search.key ?? column.prop!]"
    v-bind="column.search.attrs"
  ></RemoteSelect>
</template>

<script setup lang="ts" name="searchFormItem">
import { ColumnProps } from "../../../interface";
import { computed, inject, ref } from "vue";
import RemoteSelect from "./RemoteSelect.vue";

interface SearchFormItem {
  column: ColumnProps; // 具体每一个搜索项的配置
  searchParam: { [key: string]: any }; // 搜索参数
}
const props = defineProps<SearchFormItem>();

// 接受 enumMap
const enumMap = inject("enumMap", ref(new Map()));

const columnEnum = computed(() => {
  if (!enumMap.value.get(props.column.prop)) return [];
  return enumMap.value.get(props.column.prop);
});

// 判断 fieldNames 设置 label && value 的 key 值
const fieldNames = () => {
  return {
    label: props.column.fieldNames?.label ?? "label",
    value: props.column.fieldNames?.value ?? "value",
  };
};

// 判断 placeholder
const placeholder = (column: ColumnProps) => {
  return column.search?.props?.placeholder ?? (column.search?.el === "input" ? "请输入" : "请选择");
};

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = (column: ColumnProps) => {
  return (
    column.search?.props?.clearable ?? (column.search?.defaultValue == null || column.search?.defaultValue == undefined)
  );
};
</script>
