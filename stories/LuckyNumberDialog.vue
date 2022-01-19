<template>
	<kx-base-dialog
		title="算算你的幸运数字"
		:click-to-close="true"
		:draggable="true"
		@close="$emit('update:open', false)"
	>
		<p><span>姓名：</span>{{ name }}</p>
		<p><span>年龄：</span>{{ age }}</p>
		<p :class="$style.tip">(点击背景可以关闭窗口)</p>

		<div :class="$style.buttons" class="btn-group">
			<kx-button class="second outline" @click="inputDialog">输入信息</kx-button>
			<kx-button class="primary outline" @click="showLuckyNumber">计算！</kx-button>
		</div>
	</kx-base-dialog>
</template>

<script>
import InputBox from "./InputBox.vue";
import KxBaseDialog from "@/dialog/KxBaseDialog.vue";

export default {
	name: "LuckyNumber",
	components:{
		KxBaseDialog,
	},
	emits: ["update:open"],
	inject: ["$dialog"],
	data: () => ({
		name: "小明",
		age: 18,
		hasInput: false,
	}),
	methods: {
		async inputDialog() {
			const result = await this.$dialog.show(InputBox, {
				oldName: this.name,
				oldAge: this.age,
				hasInput: this.hasInput,
			});
			if (result.isConfirm) {
				this.hasInput = true;
				Object.assign(this.$data, result.data);
			}
		},
		showLuckyNumber() {
			const name = this.name;
			let num = this.age;

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
