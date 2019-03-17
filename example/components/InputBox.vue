<template>
	<kx-base-dialog title="请输入一些信息">
		<form id="result">
			<label>你的名字</label>
			<input v-model="name" placeholder="某某某"/>

			<label>年龄</label>
			<input type="number" v-model="age" value="0"/>
		</form>
		<kx-standard-dialog-buttons :cancel-button="true" :confirm-hook="ok"/>
	</kx-base-dialog>
</template>

<script>
import KxStandardDialogButtons from "../../src/dialog/KxStandardDialogButtons";
import { MessageBoxType } from "../../src/dialog";

export default {
	name: "InputBox",
	components: { KxStandardDialogButtons },
	props: ["data"],
	data () {
		return Object.assign({
			name: "",
			age: "18",
		}, this.data);
	},
	methods: {
		async ok () {
			let num = parseInt(this.age);
			if (Number.isNaN(num)) {
				await this.$dialog.messageBox({
					title: "输入错误",
					content: "您输入的年龄不是数字",
					type: MessageBoxType.Error,
				});
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
