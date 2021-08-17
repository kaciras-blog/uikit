<template>
	<kx-base-dialog title="请输入一些信息">
		<form id="result">
			<label for="name">你的名字</label>
			<input id="name" v-model.trim="name" placeholder="某某某"/>

			<label for="age">年龄</label>
			<input id="age" type="number" v-model.number="age"/>
		</form>
		<kx-dialog-buttons :cancel-button="true" @confirm="ok"/>
	</kx-base-dialog>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";

const { oldName, oldAge, hasInput } = defineProps([
	"oldName",
	"oldAge",
	"hasInput",
]);

const data = reactive(hasInput ? { name: oldName, age: oldAge } : { name: "", age: 18 });

function ok() {
	if (this.name.length === 0) {
		return this.$dialog.alertError("错误", "请输入一个名字");
	}

	if (!Number.isInteger(this.age)) {
		return this.$dialog.alertError("错误", "您输入的年龄不是数字");
	} else if (this.age <= 0) {
		return this.$dialog.alertError("错误", "年龄不能为负数或零");
	}

	this.$dialog.confirm(this.$data);
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
