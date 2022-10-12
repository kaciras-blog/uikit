import { Story } from "@storybook/vue3";
import { KxTaskButton, sleep } from "@";
import { noop } from "@vueuse/core";

export default {
	component: KxTaskButton,
	args: {
		async: true,
		abortable: false,
	},
};

const render: Story = args => ({
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
		handleClick: args.async
			? () => sleep(3000)
			: noop,
	}),
});

export const TaskButton = { render };
