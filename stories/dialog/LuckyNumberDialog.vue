<template>
	<KxBaseDialog
		title='算算你的幸运数字'
		:click-to-close='true'
		:draggable='true'
		:style="{ width: '20rem' }"
	>
		<p>
			<span>姓名：</span>{{ name }}
		</p>
		<p>
			<span>年龄：</span>{{ age }}
		</p>

		<p :class='$style.tip'>
			(点击背景可以关闭窗口)
		</p>

		<div
			:class='$style.buttons'
			class='btn-group'
		>
			<KxButton
				type='outline'
				color='second'
				@click='inputDialog'
			>
				输入信息
			</KxButton>
			<KxButton
				type='outline'
				color='primary'
				@click='showResult'
			>
				计算！
			</KxButton>
		</div>
	</KxBaseDialog>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { KxBaseDialog, KxButton, useDialog } from "../../src/index.ts";
import InputBox from "./InputBox.vue";

const $dialog = useDialog();

const data = reactive({
	name: "小明",
	age: 18,
	hasInput: false,
});

const { name, age, hasInput } = toRefs(data);

async function inputDialog() {
	const result = await $dialog.show(InputBox, {
		name: name.value,
		age: age.value,
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
