<template>
	<kx-base-dialog title="请输入一些信息">
		<form id="result">
			<label for="name">你的名字</label>
			<input id="name" v-model="name" placeholder="某某某"/>

			<label for="age">年龄</label>
			<input id="age" type="number" v-model="age" value="0"/>
		</form>
		<kx-standard-dialog-buttons :cancel-button="true" @confirm="ok"/>
	</kx-base-dialog>
</template>

<script>
import KxStandardDialogButtons from "../src/dialog/KxStandardDialogButtons";
import { PreventScrollMixin } from "../src";

export default {
	name: "InputBox",
	components: {
		KxStandardDialogButtons,
	},
	props: ["data"],
	mixins: [PreventScrollMixin],
	data() {
		return Object.assign({
			name: "",
			age: "18",
		}, this.data);
	},
	methods: {
		async ok() {
			let num = parseInt(this.age);
			if (Number.isNaN(num)) {
				await this.$dialog.alertError("输入错误", "您输入的年龄不是数字");
				this.age = "18";
			}
			if (this.name.length === 0) {
				this.name = "某某某";
			}
			this.$dialog.confirm(this.$data);
		},
	},
};
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
