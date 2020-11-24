<template>
	<kx-frame>
		<kx-frame-header title="演示弹出层"/>
		<div class="kx-frame-body" :class="$style.body">
			<kx-button class="primary" @click="showDialog">内层弹窗</kx-button>
		</div>
	</kx-frame>
</template>

<script>
import KxFrame from "@/dialog/KxFrame";
import KxFrameHeader from "@/dialog/KxFrameHeader";
import LuckyNumber from "./LuckyNumberDialog";

export default {
	name: "DemoFrame",
	components: {
		KxFrame,
		KxFrameHeader,
	},
	methods: {
		showDialog() {
			this.$dialog.show(LuckyNumber);
		},
	},
};
</script>

<style module lang="less">
.body {
	padding: 20px;
	text-align: center;
}
</style>
