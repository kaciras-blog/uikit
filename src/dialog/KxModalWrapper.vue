<!--
TODO: 将MessageBox和DialogBase的最外层移到这里，如何方便地对面板设置属性而不是遮罩层？
-->
<template>
	<div class="kx-dialog-background dimmer"><slot/></div>
</template>

<script>
export default {
	name: "KxModalWrapper",
	props: {
		preventScroll: {
			type: Boolean,
			default: false,
		}
		// TODO: ESC
	},
	mounted () {
		if (this.preventScroll) {
			const { style } = document.body;
			this._backupHeight = style.height;
			this._backupOverflow = style.overflow;
			style.height = '100%';
			style.overflow = 'hidden';
		}
	},
	destroyed () {
		if (this._backupHeight) {
			const { style } = document.body;
			style.overflow = this._backupOverflow;
			style.height = this._backupHeight;
		}
	}
};
</script>

<style lang="less">
.kx-dialog-background {
	background-color: rgba(0, 0, 0, .2);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
