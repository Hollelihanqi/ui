<template>
	<div class="card content-box">
		<el-button type="primary" v-debounce="debounceClick">防抖按钮 (0.5秒后执行)</el-button>
	</div>
</template>

<script setup lang="ts" name="debounceDirect">
import { ElMessage } from "element-plus";
const debounceClick = () => {
	ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
</script>

