<template>
	<div id="app" @contextmenu.prevent="contextMenu">
		<kx-button type="button" @click="mainDialog">算一下幸运数字</kx-button>
		<kx-dialog-container></kx-dialog-container>
	</div>
</template>

<script>
import LuckyNumber from "../components/LuckyNumber";
import TestContextMenu from "../components/TestContextMenu";


export default {
	methods: {
		mainDialog () {
			this.$dialog.show(LuckyNumber);
		},
		/**
		 *
		 * @param event {MouseEvent}
		 */
		contextMenu (event) {
			if (event.button !== 2) {
				return;
			}
			this.$dialog.show(TestContextMenu, { event });
		},
	},
};
</script>

<style scoped lang="less">

</style>
