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
		// TODO: ESC
	},
	mounted () {
		const { style } = document.body;
		this._backupHeight = style.height;
		this._backupOverflow = style.overflow;
		style.height = '100%';
		style.overflow = 'hidden';
	},
	destroyed () {
		const { style } = document.body;
		style.height = this._backupHeight;
		style.overflow = this._backupOverflow;
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
