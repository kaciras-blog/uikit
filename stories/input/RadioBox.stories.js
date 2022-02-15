import { ref } from "vue";
import KxRadioBoxGroup from "@/input/KxRadioBoxGroup.vue";

export default {
	component: KxRadioBoxGroup,
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const RadioBox = args => ({
	template: `
		<h1>Selected: {{ value }}</h1>
		<KxRadioBoxGroup v-bind="args" v-model="value">
			<KxRadioBox :value="0">0: Apple</KxRadioBox>
			<KxRadioBox :value="1">1: PC</KxRadioBox>
			<KxRadioBox :value="2">2: Android</KxRadioBox>
			<KxRadioBox :value="3">3: WindowsPhone</KxRadioBox>
		</KxRadioBoxGroup>
	`,
	setup() {
		return { args, value: ref(1) };
	},
});
