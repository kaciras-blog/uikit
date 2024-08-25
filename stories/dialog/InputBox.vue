<template>
	<KxBaseDialog title='请输入一些信息'>
		<form id='result'>
			<label for='name'>
				你的名字
			</label>
			<input
				id='name'
				v-model.trim='data.name'
				placeholder='某某某'
			/>

			<label for='age'>
				年龄
			</label>
			<input
				id='age'
				type='number'
				v-model.number='data.age'
			/>
		</form>

		<KxDialogButtons
			@accept='ok'
			@cancel='$dialog.close'
		/>
	</KxBaseDialog>
</template>

<script setup lang="ts">
import { reactive, toRaw } from "vue";
import { KxBaseDialog, KxDialogButtons, useDialog } from "../../src/index.ts";

interface InputBoxProps {
	name: string;
	age: number;
	hasInput: boolean;
}

const props = defineProps<InputBoxProps>();

const data = reactive(props.hasInput ? toRaw(props) : { name: "", age: 18 });

const $dialog = useDialog();

function ok() {
	if (data.name.length === 0) {
		return $dialog.alertError("错误", "请输入一个名字");
	}

	if (!Number.isInteger(data.age)) {
		return $dialog.alertError("错误", "您输入的年龄不是数字");
	} else if (data.age <= 0) {
		return $dialog.alertError("错误", "年龄不能为负数或零");
	}

	$dialog.confirm(data);
}
</script>

<style lang="less">
#result {
	display: grid;
	grid-template-rows: auto auto;
	grid-template-columns: auto 1fr;
	grid-gap: 1rem;
	align-items: center;

	& > label {
		justify-self: right;
		grid-column-start: 1;
	}

	& > input {
		grid-column-start: 2;
	}

	& > button {
		grid-column: ~"1/3";
	}
}
</style>
