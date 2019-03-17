<template>
	<transition name="fade">
		<div class="kx-dialog-background dimmer" @click.self="dimmerClick">
			<slot/>
		</div>
	</transition>
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
.fade-enter {
	transform: scale(0.95, 0.95);
	opacity: 0;
}

.fade-enter-active {
	transition: all 0.3s;
}

.kx-dialog-background {
	background-color: rgba(0, 0, 0, .2);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
