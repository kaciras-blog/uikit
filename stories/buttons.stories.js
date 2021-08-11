import { action } from "@storybook/addon-actions";
import { sleep } from "../src/index";

// link buttons?
export default {
	title: "Button",
	argTypes: {
		waiting: {
			control: { type: "boolean" },
		},
	},
};

export const NormalButton = () => ({
	template: `
		<p>
			<kx-button icon="far fa-paper-plane" @click="handleClick">默认样式</kx-button>
		</p>
		<p class="btn-group">
			<kx-button class="primary">主要按钮</kx-button>
			<kx-button class="second">次要按钮</kx-button>
			<kx-button class="info">信息按钮</kx-button>
			<kx-button class="dangerous">危险操作</kx-button>
		</p>
		<p class="btn-group">
			<kx-button type="outline" class="primary outline">主要按钮</kx-button>
			<kx-button type="outline" class="second outline">次要按钮</kx-button>
			<kx-button type="outline" class="info outline">信息按钮</kx-button>
			<kx-button type="outline" class="dangerous outline">危险操作</kx-button>
		</p>
	`,
	methods: {
		handleClick: action("button-click"),
	},
});

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
