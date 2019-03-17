<template>
	<kx-base-dialog
		title="算算你的幸运数字"
		@close-button-clicked="close"
		:draggable="true"
		:click-to-close="true"
	>
		<div><span>姓名：</span>{{name}}</div>
		<div><span>年龄：</span>{{age}}</div>
		<span :class="$style.tip">(点击背景可以关闭窗口)</span>

		<div :class="$style.buttons" class="btn-group">
			<kx-button class="second outline" @click="inputDialog">输入信息</kx-button>
			<kx-button class="primary outline" @click="luckyNum">计算！</kx-button>
		</div>
	</kx-base-dialog>
</template>

<script>
import InputBox from "./InputBox.vue";
import { MessageBoxType } from "../../src/dialog";

export default {
	name: "LuckyNumber",
	data: () => ({
		name: "未输入",
		age: "0",
		inputed: false,
	}),
	methods: {
		async inputDialog () {
			const { isConfirm, result } = await this.$dialog.show(InputBox, this.$data);
			if (isConfirm) {
				this.inputed = true;
				Object.assign(this.$data, result);
			}
		},
		luckyNum () {
			if (!this.inputed) {
				return this.$dialog.messageBox({
					title: "无法计算",
					content: "请先随意输入姓名和年龄",
					type: MessageBoxType.Error,
				});
			}

			let num = parseInt(this.age);
			const name = this.name;
			for (let i = name.length - 1; i >= 0; i--) {
				num += name.charCodeAt(i);
			}
			num = num % 11;

			this.$dialog.messageBox({
				title: "幸运数字",
				content: [
					"经过详细而周密的计算！",
					"你的幸运数字是：" + num,
				],
				type: MessageBoxType.Success,
			})
				.onComfirm(() => this.$dialog.confirm());
		},
		close () {
			this.$dialog.confirm();
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
