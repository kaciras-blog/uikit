import { storiesOf } from "@storybook/vue";
import KxButton from "../src/components/KxButton.vue";
import KxTaskButton from "../src/components/KxTaskButton.vue";
import { sleep } from "../src/index";


storiesOf("Button", module).add("plain button", () => ({
	components: { KxButton },
	template: "<kx-button>rounded</kx-button>",
})).add("task button", () => ({
	components: { KxTaskButton },
	template: "<kx-task-button :on-click='load'>加载按钮</kx-task-button>",
	methods: {
		load() {
			return sleep(3000);
		},
	},
}));
