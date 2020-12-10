import { action } from "@storybook/addon-actions";
import { sleep } from "../src/index";

// link buttons?
export default {
	title: "Button",
};

export const plainButtons = () => ({
	template: `
		<div>
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
				<kx-button class="primary outline">主要按钮</kx-button>
				<kx-button class="second outline">次要按钮</kx-button>
				<kx-button class="info outline">信息按钮</kx-button>
				<kx-button class="dangerous outline">危险操作</kx-button>
			</p>
		</div>
	`,
	methods: {
		handleClick: action("button-click"),
	},
});

plainButtons.storyName = "Plain";

export const taskButtons = () => ({
	template: `
		<div>
			<p class="btn-group">
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
			</p>
		</div>`,
	methods: {
		load() {
			return sleep(3000);
		},
	},
});

taskButtons.storyName = "Task";

export const toolButtons = () => ({
	template: `
		<div class="toolbar">
			<kx-tool-button class="tool-button" @click="handleClick">
				<i class="far fa-question-circle"></i>
			</kx-tool-button>
			<kx-tool-button class="tool-button" @click="handleClick">
				<i class="far fa-edit"></i>
			</kx-tool-button>
			<kx-tool-button class="tool-button" @click="handleClick">
				<i class="fas fa-eye"></i>
			</kx-tool-button>
			<kx-tool-button class="tool-button" @click="handleClick">
				<i class="far fa-trash-alt"></i>
			</kx-tool-button>
			<kx-tool-button class="tool-button" href="#" @click="handleClick">
				<i class="far fa-paper-plane"></i>
			</kx-tool-button>
			<kx-tool-button class="tool-button" route="#" @click="handleClick">
				Vue路由
			</kx-tool-button>
		</div>
	`,
	methods: {
		handleClick: action("button-click"),
	},
});

toolButtons.storyName = "Tool";
