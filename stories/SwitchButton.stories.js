import KxSwitchBox from "@/components/KxSwitchBox";

export default {
	title: "SwitchButton",
	component: KxSwitchBox,
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const Switch = args => ({
	setup() {
		return { args };
	},
	template: `
		<div style="width: 300px">
			<p>
				Model value: {{ value }}
			</p>
			<kx-switch-box
				v-bind="args"
				v-model="value"
			>
				这是一个切换按钮
			</kx-switch-box>
		</div>
	`,
	data: () => ({ value: true }),
});

Switch.args = {
	disabled: false,
};
