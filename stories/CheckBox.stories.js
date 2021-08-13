import KxCheckBox from "@/components/KxCheckBox";

export default {
	title: "CheckBox",
	component: KxCheckBox,
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

const Template = args => ({
	setup() {
		return { args };
	},
	template: `
		<p>
			Model value: {{value}}
		</p>
		<kx-check-box
			v-bind="args"
			v-model="value"
		>
			这是一个复选框
		</kx-check-box>
	`,
	data: () => ({ value: false }),
});

export const CheckBox = Template.bind({});
CheckBox.args = {
	disabled: false,
};
