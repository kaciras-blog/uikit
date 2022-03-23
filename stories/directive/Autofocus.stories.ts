import { Story } from "@storybook/vue3";

export default {};

export const Autofocus: Story = () => ({
	template: `
		<KxButton 
			@click="visible = !visible"
		>
			切换显示
		</KxButton>
		<p></p>
		<input v-if="visible" v-autofocus>
	`,
	data:() =>({ visible: false }),
});
