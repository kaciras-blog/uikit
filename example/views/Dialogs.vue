<template>
	<div v-context-menu="'TestContextMenu'">
		<kx-button type="button" @click="mainDialog">算一下幸运数字</kx-button>
		<kx-button type="button" @click="showImageViewer($event, true)">很宽的图片</kx-button>
		<kx-button type="button" @click="showImageViewer($event, false)">很高的图片</kx-button>
		<kx-dialog-container></kx-dialog-container>
	</div>
</template>

<script>
import LuckyNumber from "../components/LuckyNumber";
import TestContextMenu from "../components/TestContextMenu";
import ImageViewer from "../../src/dialog/KxImageViewer";

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
		showImageViewer(event, wideOrHeight) {
			const src = wideOrHeight ? require("../assets/WideImage.jpg") : require("../assets/HeightImage.jpg");
			this.$dialog.show(ImageViewer, { src, element: event.target })
		},
	},
};
</script>

<style scoped lang="less">

</style>
