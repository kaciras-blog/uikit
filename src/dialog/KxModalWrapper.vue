<!--
TODO: 将MessageBox和DialogBase的最外层移到这里，如何方便地对面板设置属性而不是遮罩层？
-->
<template>
	<div class="kx-dialog-background dimmer"><slot/></div>
</template>

<script>
import { preventScroll } from "..";

export default {
	name: "KxModalWrapper",
	props: {
		preventScroll: {
			type: Boolean,
			default: false,
		},
		// TODO: ESC
	},
	mounted() {
		if (this.preventScroll) {
			this._restore = preventScroll();
		}
	},
	destroyed() {
		if (this._restore) {
			this._restore();
		}
	},
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
