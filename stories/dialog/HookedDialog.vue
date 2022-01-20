<template>
	<kx-base-dialog title="关闭钩子">
		<p>beforeDialogClose() 返回 Promise 可以延迟窗口的关闭</p>
		<p v-if="time" :class="$style.timer">窗口将在 {{ time }} 秒后关闭</p>
	</kx-base-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const time = ref(0);

function countdown(callback) {
	if (--time.value === 0) {
		callback();
	}
	setTimeout(() => countdown(callback), 1000);
}

function beforeDialogClose() {
	time.value = 4;
	return new Promise(countdown);
}
</script>

<style module lang="less">
.timer {
	color: blue;
	text-align: center;
}
</style>
