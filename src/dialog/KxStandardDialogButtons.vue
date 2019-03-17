<template>
	<div class="btn-group" :class="$style.container">
		<kx-button
			v-if="cancelButton"
			@click="$dialog.cancel()">
			取消
		</kx-button>
		<kx-button
			v-if="applyHook"
			@click="applyHook">
			应用
		</kx-button>
		<kx-button
			class="primary"
			@click="confirm">
			确定
		</kx-button>
	</div>
</template>

<script>
export default {
	name: "KxStandardDialogButtons",
	props: {
		cancelButton: Boolean,
		applyHook: Function,
		confirmHook: Function,
	},
	methods: {
		confirm() {
			if(this.confirmHook) {
				this.confirmHook();
			} else {
				this.$dialog.confirm();
			}
		}
	}
};
</script>

<style module lang="less">
.container {
	text-align: right;
	margin-top: 20px;
}
</style>
