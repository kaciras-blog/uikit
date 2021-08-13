import { sleep } from "@";
import KxTaskButton from "@/components/KxTaskButton";

export default {
	title: "TaskButton",
	component: KxTaskButton,
	argTypes: {
		waiting: {
			control: { type: "boolean" },
		},
	},
};

export const TaskButton = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `
		<div class="btn-group">
			<kx-task-button :on-click="load">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
			<kx-task-button class="second outline" :on-click="load">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
			<kx-task-button class="info outline" :on-click="load">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
			<kx-task-button class="dangerous" :on-click="load">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
		</div>`,
	methods: {
		load: () => sleep(3000),
	},
});

TaskButton.args = {
	waiting: false,
};
