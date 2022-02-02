<template>
	<kx-base-dialog
		title="算算你的幸运数字"
		:click-to-close="true"
		:draggable="true"
		@close="$emit('update:open', false)"
	>
		<p>
			<span>姓名：</span>{{ name }}
		</p>
		<p>
			<span>年龄：</span>{{ age }}
		</p>

		<p :class="$style.tip">
			(点击背景可以关闭窗口)
		</p>

		<div
			:class="$style.buttons"
			class="btn-group"
		>
			<kx-button
				type="outline"
				color="second"
				@click="inputDialog"
			>
				输入信息
			</kx-button>
			<kx-button
				type="outline"
				color="primary"
				@click="showResult"
			>
				计算！
			</kx-button>
		</div>
	</kx-base-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import KxBaseDialog from "@/dialog/KxBaseDialog.vue";
import { useDialog } from "@";
import InputBox from "./InputBox.vue";

defineEmits(["update:open"]);

const $dialog = useDialog();

const data = reactive({
	name: "小明",
	age: 18,
	hasInput: false,
});

const { name, age, hasInput } = toRefs(data);

async function inputDialog() {
	const result = await $dialog.show(InputBox, {
		oldName: name.value,
		oldAge: age.value,
		hasInput: hasInput.value,
	});
	if (result.isConfirm) {
		hasInput.value = true;
		Object.assign(data, result.data);
	}
}

function showResult() {
	const name = data.name;
	let num = data.age;

	for (let i = name.length - 1; i >= 0; i--) {
		num += name.charCodeAt(i);
	}
	num = num % 11;

	return $dialog
		.alertSuccess("幸运数字", `经过详细而周密的计算！\n你的幸运数字是：${num}`)
		.onConfirm($dialog.close as any);
}
</script>

<style module lang="less">
.buttons {
	margin-top: 1rem;
	float: right;
}

.tip {
	color: #818181;
	font-size: 0.9em;
}
</style>
