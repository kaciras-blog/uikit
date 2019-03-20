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

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { DialogOptions, DialogResult } from "./index";

interface DialogContext extends DialogOptions {
	id: number;
}

@Component
export default class KxDialogContainer extends Vue {

	private stack: DialogContext[] = [];
	private counter: number = 0;

	created() {
		const { eventBus } = this.$dialog;

		eventBus.$on("show", (config: DialogContext) => {
			config.id = ++this.counter;
			this.stack.push(config);
		});

		eventBus.$on("close", (result: DialogResult<any>) => {
			const config = this.stack.pop();
			if (!config) {
				throw new Error("当前没有可关闭的弹窗");
			}
			config.resolve(result);
		});

		eventBus.$on("clear", () => {
			this.stack.forEach(c => c.resolve(DialogResult.CANCELED));
			this.stack = [];
		});
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
