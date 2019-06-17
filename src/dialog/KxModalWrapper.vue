<!--
TODO: 将MessageBox和DialogBase的最外层移到这里，如何方便地对面板设置属性而不是遮罩层？
-->
<template>
	<div class="kx-modal">
		<slot/>
	</div>
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
.kx-modal {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, .2);
}
</style>
