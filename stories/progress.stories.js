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
	data: () => ({
		value: 0,
	}),
	methods: {
		increase() {
			this.$refs.progress.start();
			this.value = Math.min(this.value + 10, 100);
			this.$refs.progress.setProgress(this.value);
		},
		fail() {
			this.value = 0;
			this.$refs.progress.fail();
		},
		reset() {
			this.value = 0;
			this.$refs.progress.reset();
		},
	},
}));
