import { ref } from "vue";
import KxCheckBox from "@/input/KxCheckBox.vue";

export default {
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
			modelValue: {{ value }}
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
