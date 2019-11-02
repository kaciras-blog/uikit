import { action } from '@storybook/addon-actions';
import KxButton from "../src/components/KxButton.vue";
import KxTaskButton from "../src/components/KxTaskButton.vue";
import { sleep } from "../src/index";

// link buttons?
export default {
	title: 'Buttons',
};

export const plainButtons =() => ({
	components: { KxButton },
	template: `
	<div>
		<p>
			<kx-button @click="handleClick">默认样式</kx-button>
		</p>
		<p class="btn-group">
			<kx-button class="primary">主要按钮</kx-button>
			<kx-button class="second">次要按钮</kx-button>
			<kx-button class="info">信息</kx-button>
			<kx-button class="dangerous">危险操作</kx-button>
		</p>
		<p class="btn-group">
			<kx-button class="primary outline">主要按钮</kx-button>
			<kx-button class="second outline">次要按钮</kx-button>
			<kx-button class="info outline">信息</kx-button>
			<kx-button class="dangerous outline">危险操作</kx-button>
		</p>
	</div>
	`,
	methods:{
		handleClick: action('button-click'),
	}
});

plainButtons.story = { name: "Plain" };

export const taskButtons = () => ({
	components: { KxTaskButton },
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

taskButtons.story = { name: "Task" };
