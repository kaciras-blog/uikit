<!--
TODO: 将MessageBox和DialogBase的最外层移到这里，如何方便地对面板设置属性而不是遮罩层？
-->
<template>
	<div class="full-vertex kx-modal"><slot/></div>
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
.kx-modal {
	position: fixed;
	z-index: 1000;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, .3);
}
</style>
