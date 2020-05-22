import { storiesOf } from "@storybook/vue";

const stories = storiesOf("Progress", module);

stories.add("top-progress", () => ({
	template: `
		<div>
			<kx-progress ref="progress"></kx-progress>
			<kx-button @click="increase">增加10%</kx-button>
		</div>`,
	methods: {
		increase() {
			this.$refs.progress.start();
			this.$refs.progress.setProgress(70);
		},
	},
}));
