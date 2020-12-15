<template>
	<kx-base-dialog title="关闭钩子">
		<p>beforeDialogClose() 返回 Promise 可以延迟窗口的关闭</p>
		<p v-if="time" :class="$style.timer">窗口将在 {{ time }} 秒后关闭</p>
	</kx-base-dialog>
</template>

<script>
export default {
	name: "HookedDialog",
	data: () => ({
		time: 0,
	}),
	methods: {
		countdown(callback) {
			if (--this.time === 0) {
				callback();
			}
			setTimeout(() => this.countdown(callback), 1000);
		},
	},
	beforeDialogClose() {
		this.time = 4;
		return new Promise(this.countdown);
	},
};
</script>

<style module lang="less">
.timer {
	color: blue;
	text-align: center;
}
</style>
