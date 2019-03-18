<template>
	<div class="kx-dialog-background dimmer" @click.self="dimmerClick"><slot/></div>
</template>

<script>
export default {
	name: "KxModalWrapper",
	props: {
		/** 点击遮罩背景是否关闭弹窗，默认true */
		clickToClose: {
			type: Boolean,
			default: true,
		},

		// TODO: ESC
	},
	methods: {
		dimmerClick () {
			if (this.clickToClose)
				this.$dialog.cancel()
		},
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
