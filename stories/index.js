import "../src/css/Index.less";
import { storiesOf } from "@storybook/vue";
import KxButton from "../src/components/KxButton.vue";
import KxTaskButton from "../src/components/KxTaskButton.vue";
import { sleep } from "../src/index";


storiesOf("Button", module).add("plain button", () => ({
	components: { KxButton },
	template: `
	<div class="btn-group">
		<kx-button>默认的按钮样式</kx-button>
		<kx-button class="primary">主要要按钮</kx-button>
		<kx-button class="second">次要按钮</kx-button>
		<kx-button class="info">信息按钮</kx-button>
		<kx-button class="dangerous">危险操作</kx-button>
	</div>
	`,
})).add("task button", () => ({
	components: { KxTaskButton },
	template: `<kx-task-button :on-click="load">加载按钮</kx-task-button>`,
	methods: {
		load() {
			return sleep(3000);
		},
	},
}));
