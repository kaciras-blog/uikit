<template>
	<kx-base-dialog title="算算你的幸运数字" :draggable="true" :click-to-close="true">
		<p><span>姓名：</span>{{ name }}</p>
		<p><span>年龄：</span>{{ age }}</p>
		<p :class="$style.tip">(点击背景可以关闭窗口)</p>

		<div :class="$style.buttons" class="btn-group">
			<kx-button class="second outline" @click="inputDialog">输入信息</kx-button>
			<kx-button class="primary outline" @click="luckyNum">计算！</kx-button>
		</div>
	</kx-base-dialog>
</template>

<script>
import InputBox from "./InputBox.vue";

export default {
	name: "LuckyNumber",
	data: () => ({
		name: "未输入",
		age: "0",
		hasInput: false,
	}),
	methods: {
		async inputDialog() {
			const result = await this.$dialog.show(InputBox, this.$data);
			if (result.isConfirm) {
				this.hasInput = true;
				Object.assign(this.$data, result.data);
			}
		},
		luckyNum() {
			if (!this.hasInput) {
				return this.$dialog.alertError("无法计算", "请先随意输入姓名和年龄");
			}

			let num = parseInt(this.age);
			const name = this.name;
			for (let i = name.length - 1; i >= 0; i--) {
				num += name.charCodeAt(i);
			}
			num = num % 11;

			return this.$dialog
				.alertSuccess("幸运数字", `经过详细而周密的计算！\n你的幸运数字是：${num}`)
				.onConfirm(this.$dialog.close);
		},
	},
};
</script>

<style module lang="less">
.buttons {
	margin-top: 1rem;
	float: right;
}

.tip {
	color: #818181;
	font-size: .9em;
}
</style>
