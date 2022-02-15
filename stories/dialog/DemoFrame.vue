<template>
	<KxFrame>
		<KxFrameHeader title="标题">
			<KxButton
				:class="$style.icon"
				type="icon"
			>
				<SearchIcon/>
			</KxButton>
			<KxButton
				:class="$style.icon"
				type="icon"
			>
				<HelpIcon/>
			</KxButton>
		</KxFrameHeader>

		<div class="kx-frame-body" :class="$style.body">
			<KxButton @click="showDialog">
				内层弹窗
			</KxButton>
			<p></p>
			<p>模仿手机弹出层，在窄屏下可以按返回键关闭</p>
		</div>
	</KxFrame>
</template>

<script lang="ts">
import { KxButton, KxFrame, KxFrameHeader } from "../../src";
import SearchIcon from "../assets/search.svg?sfc";
import HelpIcon from "../assets/help.svg?sfc";
import LuckyNumber from "./LuckyNumberDialog.vue";

export default {
	name: "DemoFrame",
	isolation: true,
	components: {
		SearchIcon,
		HelpIcon,
		KxFrame,
		KxButton,
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

.icon {
	width: 48px;
	border-radius: 0;
}
</style>
