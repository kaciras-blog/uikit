import { ref } from "vue";
import KxRadioBoxGroup from "@/input/KxRadioBoxGroup";

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

export const RadioBox = {
	render: args => ({
		template: `
			<h1>Selected: {{ value }}</h1>
			<kx-radio-box-group v-bind="args" v-model="value">
				<kx-radio-box :value="0">0: Apple</kx-radio-box>
				<kx-radio-box :value="1">1: PC</kx-radio-box>
				<kx-radio-box :value="2">2: Android</kx-radio-box>
				<kx-radio-box :value="3">3: WindowsPhone</kx-radio-box>
			</kx-radio-box-group>
		`,
		setup() {
			return { args, value: ref(1) };
		},
	}),
};
