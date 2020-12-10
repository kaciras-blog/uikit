<template>
	<kx-frame>
		<kx-frame-header title="标题">
			<kx-tool-button :class="$style.icon">
				<i class="fas fa-search"/>
			</kx-tool-button>
			<kx-tool-button :class="$style.icon">
				<i class="far fa-question-circle"/>
			</kx-tool-button>
		</kx-frame-header>
		<div class="kx-frame-body" :class="$style.body">
			<kx-button class="primary" @click="showDialog">
				内层弹窗
			</kx-button>
			<p></p>
			<p>模仿手机弹出层，在窄屏下可以按返回键关闭</p>
		</div>
	</kx-frame>
</template>

<script>
import LuckyNumber from "./LuckyNumberDialog";

export default {
	name: "DemoFrame",
	isolation: true,
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
	font-size: 20px;
}
</style>
