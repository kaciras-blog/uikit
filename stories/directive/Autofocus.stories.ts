import { StoryFn } from "@storybook/vue3";

export default {
	title: "Autofocus",
};

export const Autofocus: StoryFn = () => ({
	template: `
		<KxButton 
			@click="visible = !visible"
		>
			切换显示
		</KxButton>
		<p></p>
		<input v-if="visible" v-autofocus>
	`,
	data: () =>({ visible: false }),
});
