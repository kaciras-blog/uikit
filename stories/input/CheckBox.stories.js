import { ref } from "vue";
import KxCheckBox from "@/input/KxCheckBox";

export default {
	title: "CheckBox",
	component: KxCheckBox,
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const CheckBox = args => ({
	template: `
		<p>
		Model value: {{ value }}
		</p>
		<kx-check-box
			v-bind="args"
			v-model="value"
		>
		这是一个复选框
		</kx-check-box>
	`,
	setup() {
		return { args, value: ref(false) };
	},
});
