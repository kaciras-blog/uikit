<template>
	<div id="app" v-context-menu="'TestContextMenu'">
		<kx-button type="button" @click="mainDialog">算一下幸运数字</kx-button>
		<!--<kx-dialog-container></kx-dialog-container>-->
	</div>
</template>

<script>
import LuckyNumber from "../components/LuckyNumber";
import TestContextMenu from "../components/TestContextMenu";

export default {
	components: { TestContextMenu },
	methods: {
		mainDialog () {
			this.$dialog.show(LuckyNumber);
		},
		/**
		 *
		 * @param event {MouseEvent}
		 */
		contextMenu (event) {
			this.$dialog.contextMenu(TestContextMenu, event);
		},
	},
};
</script>

<style scoped lang="less">

</style>
