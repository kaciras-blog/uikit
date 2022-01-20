import { sleep } from "@";
import KxTaskButton from "@/input/KxTaskButton";

export default {
	title: "TaskButton",
	component: KxTaskButton,
	args: {
		waiting: false,
		onClick: () => sleep(3000),
	},
	argTypes: {
		waiting: {
			control: { type: "boolean" },
		},
	},
};

export const TaskButton = {
	render: args => ({
		template: `
			<kx-task-button v-bind="args">
				加载按钮
				<template v-slot:running>
					正在加载
				</template>
			</kx-task-button>
		`,
		setup: () => ({ args }),
	}),
};
