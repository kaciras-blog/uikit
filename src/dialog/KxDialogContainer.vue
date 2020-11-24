<!--
因为 Vue 冇得 Portals，所以需要一个全局组件来挂载弹窗。
-->
<template>
	<!-- Vue 啥时候才能支持 Fragment -->
	<div>
		<component
			v-for="(options, i) in stack"
			:key="options.id"
			:is="options.component"
			v-show="isVisible(options, i)"
			v-bind="options.props"
		/>
	</div>
</template>

<script>
import { DialogResult } from "./controller";

export default {
	name: "KxDialogContainer",
	data: () => ({
		stack: [],
		counter: 0,
	}),
	methods: {
		/**
		 * 判断弹出层是否显示，为了防止遮罩堆太多所以要隐藏非顶部的弹窗。
		 * 只有用 showFrame 弹出的和最上层的一个能够显示。
		 *
		 * @param config 选项
		 * @param index 序号
		 * @returns {boolean} 弹出层是否显示
		 */
		isVisible(config, index) {
			return config.isolation || (index === this.stack.length - 1);
		},
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
	},
};
</script>
