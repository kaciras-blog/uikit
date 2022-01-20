import { ref } from "vue";
import KxSwitchBox from "@/input/KxSwitchBox";

export default {
	title: "SwitchButton",
	component: KxSwitchBox,
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const Switch = {
	render: args => ({
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
		setup() {
			return { args, value: ref(false) };
		},
	}),
};
