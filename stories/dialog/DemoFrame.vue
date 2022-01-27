<template>
	<kx-frame>
		<kx-frame-header title="标题">
			<kx-button
				:class="$style.icon"
				type="icon"
			>
				<search-icon/>
			</kx-button>
			<kx-button
				:class="$style.icon"
				type="icon"
			>
				<help-icon/>
			</kx-button>
		</kx-frame-header>

		<div class="kx-frame-body" :class="$style.body">
			<kx-button @click="showDialog">
				内层弹窗
			</kx-button>
			<p></p>
			<p>模仿手机弹出层，在窄屏下可以按返回键关闭</p>
		</div>
	</kx-frame>
</template>

<script lang="ts">
import SearchIcon from "../assets/search.svg?sfc";
import HelpIcon from "../assets/help.svg?sfc";
import LuckyNumber from "./LuckyNumberDialog";

export default {
	name: "DemoFrame",
	isolation: true,
	components: {
		SearchIcon,
		HelpIcon,
	},
	inject: ["$dialog"],
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
