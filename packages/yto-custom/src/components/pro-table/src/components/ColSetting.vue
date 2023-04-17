<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-28 20:59:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-16 17:50:03
 * @FilePath: \xlfk-vite-vue3\src\components\ProTable\components\ColSetting.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" title="列设置" size="500px">
    <div ref="colTableRef" class="table">
      <el-table
        :data="colSetting"
        :border="true"
        row-key="prop"
        default-expand-all
        :tree-props="{ children: '_children' }"
      >
        <!-- <el-table-column prop="name" align="center" label="#">
					<el-tag class="cursor-move">
						<el-icon class="cursor-move"><DCaret /></el-icon>
					</el-tag>
				</el-table-column> -->
        <el-table-column prop="label" align="center" label="列名" />
        <el-table-column v-slot="scope" prop="isShow" align="center" label="显示">
          <el-switch v-model="scope.row.isShow"></el-switch>
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
          <el-switch v-model="scope.row.sortable"></el-switch>
        </el-table-column>
        <template #empty>
          <div class="table-empty">
            <!-- <img src="@/assets/images/notData.png" alt="notData" /> -->
            <div>暂无可配置列</div>
          </div>
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts" name="colSetting">
import { ref } from "vue";
import { ColumnProps } from "../interface";

defineProps<{ colSetting: ColumnProps[] }>();

const drawerVisible = ref<boolean>(false);
// 打开列设置
const openColSetting = () => {
  drawerVisible.value = true;
};

defineExpose({
  openColSetting,
});
</script>

<style scoped lang="scss">
.cursor-move {
  cursor: move;
}
</style>
