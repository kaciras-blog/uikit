<template>
	<transition name="fade">
		<div class="kx-dialog-background dimmer" @click.self="dimmerClick"><slot/></div>
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
				this.$dialog.eventBus.$emit("cancel");
		},
	},
};
</script>

<style lang="less">
.fade-enter {
	opacity: 0;
}

.fade-enter-active {
	transition: all 0.25s;
}

.kx-dialog-background {
	background-color: rgba(0, 0, 0, .1);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
