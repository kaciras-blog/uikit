import { ref } from "vue";
import MaterialTextInput from "@/input/MaterialTextInput.vue";

export default {
	component: MaterialTextInput,
	args: {
		disabled: false,
	},
	argTypes: {
		name: {
			control: { type: "text" },
		},
		label: {
			control: { type: "text" },
		},
		placeholder: {
			control: { type: "text" },
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const Password = args => ({
	template: `
		<material-text-input v-model="value" v-bind="args"/>
	`,
	setup() {
		return { args, value: ref("") };
	},
});

Password.args = {
	disabled: false,
	name: "name",
	label: "Your name:",
	placeholder: "default name",
};
