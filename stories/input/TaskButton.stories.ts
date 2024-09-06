import { Meta, StoryFn } from "@storybook/vue3";
import { sleep } from "@kaciras/utilities/browser";
import { noop } from "@vueuse/core";
import KxTaskButton from "../../src/input/KxTaskButton.vue";

export default {
	component: KxTaskButton,
	args: {
		async: true,
	},
} satisfies Meta;

export const TaskButton: StoryFn = args => ({
	components: { KxTaskButton },
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
		handleClick: args.async ? (_, signal) => sleep(3000, signal) : noop,
	}),
});
