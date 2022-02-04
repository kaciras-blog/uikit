import { ref } from "vue";
import KxSelect from "@/input/KxSelect.vue";

export default {
	title: "elect",
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
			<option value="1">apple</option>
			<option value="2">orange</option>
			<option value="3">tomato</option>
		</KxSelect>
	`,
	setup() {
		return { args, value: ref("1") };
	},
});
