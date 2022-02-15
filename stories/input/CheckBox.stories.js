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
		<KxCheckBox
			v-bind="args"
			v-model="value"
		>
			这是一个复选框
		</KxCheckBox>
	`,
	setup() {
		return { args, value: ref(false) };
	},
});
