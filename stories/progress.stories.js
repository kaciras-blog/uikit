import { storiesOf } from "@storybook/vue";

const stories = storiesOf("Progress", module);

stories.add("top-progress", () => ({
	template: `
		<div>
			<kx-progress ref="progress"></kx-progress>
			<kx-button @click="increase">增加10%</kx-button>
			<kx-button @click="fail">失败</kx-button>
			<kx-button @click="reset">重置</kx-button>
		</div>`,
	methods: {
		increase() {
			this.$refs.progress.start();
			this.$refs.progress.setProgress(70);
		},
		fail() {
			this.$refs.progress.fail();
		},
		reset() {
			this.$refs.progress.reset();
		},
	},
}));
