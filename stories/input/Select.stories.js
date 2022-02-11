import { ref } from "vue";
import KxSelect from "@/input/KxSelect.vue";

export default {
	title: "Select",
	component: KxSelect,
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const Select = args => ({
	components: {
		KxSelect,
	},
	template: `
		<p>当前值：{{ value }}</p>
		<KxSelect v-bind="args" v-model="value">
			<option :value="{ number: 123 }">123</option>
			<option :value="{ number: 456 }">456</option>
			<option :value="{ number: 789 }">789</option>
		</KxSelect>
	`,
	setup() {
		return { args, value: ref({ number: 123 }) };
	},
});
