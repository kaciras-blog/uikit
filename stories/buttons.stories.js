import { action } from '@storybook/addon-actions';
import KxButton from "../src/components/KxButton.vue";
import KxTaskButton from "../src/components/KxTaskButton.vue";
import { sleep } from "../src/index";

export default {
	title: 'Buttons',
};

export const plainButtons =() => ({
	components: { KxButton },
	template: `
	<div class="btn-group">
		<kx-button @click="handleClick">默认的按钮样式</kx-button>
		<kx-button class="primary">主要要按钮</kx-button>
		<kx-button class="second">次要按钮</kx-button>
		<kx-button class="info">信息按钮</kx-button>
		<kx-button class="dangerous">危险操作</kx-button>
	</div>
	`,
	methods:{
		handleClick: action('button-click'),
	}
});

plainButtons.story = { name: "Plain" };

export const taskButtons = () => ({
	components: { KxTaskButton },
	template: `<kx-task-button :on-click="load">加载按钮</kx-task-button>`,
	methods: {
		load() {
			return sleep(3000);
		},
	},
});

taskButtons.story = { name: "Task" };
