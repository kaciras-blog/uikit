<!--
因为 Vue 冇得 Portals，所以需要一个全局组件来挂载弹窗。
-->
<template>
	<div>
		<component
			v-for="(options, i) in stack"
			ref="instances"
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
	computed: {
		isMobile() {
			return window.innerWidth < 768;
		},
	},
	methods: {
		/**
		 * 判断弹出层是否显示，为了防止遮罩堆太多所以要隐藏非顶部的弹窗。
		 * 只有 isolation:true 的组件和最上层的一个能够显示。
		 *
		 * @param config 选项
		 * @param index 序号
		 * @returns {boolean} 弹出层是否显示
		 */
		isVisible(config, index) {
			return (index === this.stack.length - 1) || config.component.isolation;
		},

		/**
		 * 同步历史记录，实现手机上后退键关闭弹出层的功能。
		 *
		 * 由于设计上弹出层可能依赖父组件状态，故不支持重开。
		 *
		 * 同步的方式可以支持多级跳，但好像实际的手机浏览器没法这么做。
		 */
		syncHistory() {
			const { flag, id } = history.state || {};
			const { stack } = this;

			if (flag !== FLAG) {
				stack.forEach(this.closeDialog);
			} else {
				const i = stack.findIndex(c => c.id === id);
				stack.slice(i + 1).forEach(this.closeDialog);
			}
		},

		/**
		 * 从弹窗栈中移除指定的弹窗，弹窗可以不存在。
		 */
		remove(config, result) {
			this.stack = this.stack.filter(c => c !== config);
			config.resolve(result);
		},

		closeDialog(config, result = DialogResult.CANCELED) {
			if (config.closed) {
				return;
			}
			config.closed = true;

			const { beforeDialogClose } = config.component;
			if (typeof beforeDialogClose !== "function") {
				this.remove(config, result);
			} else {
				const i = this.stack.findIndex(c => c === config);
				const rv = beforeDialogClose.call(this.$refs.instances[i]);
				Promise.resolve(rv)
					.finally(() => this.remove(config, result));
			}
		},

		/**
		 * 向栈里添加一个弹出层，如果需要还会插入一条历史。
		 *
		 * @param config 弹出层会话
		 */
		handleAdd(config) {
			const id = ++this.counter;
			config.id = id;
			this.stack.push(config);

			if (this.isMobile) {
				history.pushState({ flag: FLAG, id }, "");
			}
		},

		/**
		 * 手动关闭顶层的弹窗，并同步历史。
		 *
		 * @param result 弹窗返回的结果
		 */
		handleClose(result) {
			const config = this.stack[this.stack.length - 1];
			if (!config) {
				throw new Error("没有可关闭的弹窗");
			}
			const { flag, id } = history.state || {};
			if (flag === FLAG && id === config.id) {
				history.back();
			} else {
				this.closeDialog(config, result);
			}
		},

		// 目前仅在切换路由时使用，所以没法清除历史
		handleClear() {
			this.stack.forEach(this.closeDialog);
			this.stack = [];
		},
	},
	beforeMount() {
		if (this.isMobile) {
			window.addEventListener("popstate", this.syncHistory);
		}
	},
	created() {
		this.$dialog.eventBus.$on("show", this.handleAdd);
		this.$dialog.eventBus.$on("close", this.handleClose);
		this.$dialog.eventBus.$on("clear", this.handleClear);
	},
	beforeUnmount() {
		window.removeEventListener("popstate", this.syncHistory);
		this.$dialog.eventBus.$off("show", this.handleAdd);
		this.$dialog.eventBus.$off("close", this.handleClose);
		this.$dialog.eventBus.$off("clear", this.handleClear);
	},
};
</script>
