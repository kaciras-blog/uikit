import { sleep } from "@";
import KxTaskButton from "@/input/KxTaskButton.vue";

export default {
	component: KxTaskButton,
	args: {
		abortable: false,
		onClick: () => sleep(3000),
	},
	argTypes: {
		abortable: {
			control: { type: "boolean" },
		},
	},
};

const render = args => ({
	template: `
		<KxTaskButton v-bind="args">
			加载按钮
			<template #running>
				正在加载
			</template>
		</KxTaskButton>
	`,
	setup: () => ({ args }),
});

export const TaskButton = { render };
