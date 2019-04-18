<template>
	<div v-show="stack.length" :class="$style.container">
		<component
			v-for="(options, index) in stack"
			:key="options.id"
			:is="options.component"
			v-show="index === stack.length - 1"
			v-bind="options.props"/>
	</div>
</template>

<script>
export default {
	name: "KxDialogContainer",
	data: () => ({
		stack: [],
		counter: 0,
	}),
	methods: {
		add(config) {
			config.id = ++this.counter;
			this.stack.push(config);
		},
		close(result) {
			const config = this.stack.pop();
			if (!config) {
				throw new Error("当前没有可关闭的弹窗");
			}
			config.resolve(result);
		},
		clear() {
			this.stack.forEach(c => c.resolve(DialogResult.CANCELED));
			this.stack = [];
		},
	},
	created() {
		this.$dialog.eventBus.$on("show", this.add);
		this.$dialog.eventBus.$on("close", this.close);
		this.$dialog.eventBus.$on("clear", this.clear);
	},
	beforeDestroy() {
		this.$dialog.eventBus.$off("show", this.add);
		this.$dialog.eventBus.$off("close", this.close);
		this.$dialog.eventBus.$off("clear", this.clear);
	}
}
</script>

<style module lang="less">
.container {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
}
</style>
