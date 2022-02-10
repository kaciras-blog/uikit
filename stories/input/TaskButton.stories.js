import { sleep } from "@";
import KxTaskButton from "@/input/KxTaskButton";

export default {
	title: "TaskButton",
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
		<kx-task-button v-bind="args">
			加载按钮
			<template v-slot:running>
				正在加载
			</template>
		</kx-task-button>
	`,
	setup: () => ({ args }),
});

export const TaskButton = { render };
