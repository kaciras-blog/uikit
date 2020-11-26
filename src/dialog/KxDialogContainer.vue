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

/** 用于标记历史记录是弹窗所产生的 */
const FLAG = "__KX_DIALOG__";

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

		syncHistory() {
			if (this.$_preventHistory) {
				this.$_preventHistory = false;
				return;
			}
			const { flag, id } = history.state || {};
			const { stack } = this;

			if (flag !== FLAG) {
				this.closeAll(stack);
				this.stack = [];
			} else {
				const i = stack.findIndex(c => c.id === id);
				this.closeAll(stack.splice(i + 1));
			}
		},

		closeAll(list) {
			list.forEach(c => c.resolve(DialogResult.CANCELED));
		},

		handleAdd(config) {
			const id = ++this.counter;
			config.id = id;
			this.stack.push(config);
			history.pushState({ flag: FLAG, id }, "");
		},

		handleClose(result) {
			const config = this.stack.pop();
			if (!config) {
				throw new Error("当前没有可关闭的弹窗");
			}
			this.$_preventHistory = true;
			history.back();
			config.resolve(result);
		},

		handleClear() {
			this.closeAll(this.stack);
			this.stack = [];
		},
	},
	beforeMount() {
		window.addEventListener("popstate", this.syncHistory);
	},
	created() {
		this.$dialog.eventBus.$on("show", this.handleAdd);
		this.$dialog.eventBus.$on("close", this.handleClose);
		this.$dialog.eventBus.$on("clear", this.handleClear);
	},
	beforeDestroy() {
		window.removeEventListener("popstate", this.syncHistory);
		this.$dialog.eventBus.$off("show", this.handleAdd);
		this.$dialog.eventBus.$off("close", this.handleClose);
		this.$dialog.eventBus.$off("clear", this.handleClear);
	},
};
</script>
