import { StoryFn } from "@storybook/vue3";
import { sleep } from "@kaciras/utilities/browser";
import { noop } from "@vueuse/core";
import KxTaskButton from "../../src/input/KxTaskButton.vue";

export default {
	component: KxTaskButton,
	args: {
		async: true,
		abortable: false,
	},
};

const render: StoryFn = args => ({
	template: `
		<KxTaskButton
			v-bind="args"
			:onClick='handleClick'
		>
			加载按钮
			<template #running>
				正在加载
			</template>
		</KxTaskButton>
	`,
	setup: () => ({
		args,
		handleClick: args.async ? () => sleep(3000) : noop,
	}),
});

export const TaskButton = { render };
