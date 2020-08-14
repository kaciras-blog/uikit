import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

const stories = storiesOf("Input", module);

stories.add("CheckBox", () => ({
	props: {
		disabled: {
			default: boolean("Disabled", false),
		},
	},
	template: `
		<div>
			<kx-check-box v-model="value" :disabled="disabled">复选框</kx-check-box>
		</div>`,
	data: () => ({ value: false }),
}));

stories.add("Switch", () => ({
	props: {
		disabled: {
			default: boolean("Disabled", false),
		},
	},
	template: `
		<div style="width: 300px">
			<kx-switch-box v-model="value" :disabled="disabled">这是一个切换按钮</kx-switch-box>
		</div>
	`,
	data: () => ({ value: true }),
}));

stories.add("Password", () => ({
	props: {
		disabled: {
			default: boolean("Disabled", false),
		},
	},
	template: `
		<div style="width: 300px">
			<label for="input">请输入密码：</label>
			<kx-password-input
				style="margin-top: 10px"
				input-id="input"
				v-model="value"
				:disabled="disabled"
			/>
		</div>`,
	data: () => ({ value: "" }),
}));

stories.add("Radio", () => ({
	props: {
		disabled: {
			default: boolean("Disabled", false),
		},
	},
	template: `
		<kx-radio-box-group v-model="value">
			<h1>Selected: {{value}}</h1>
			<kx-radio-box :value="0">0: Apple</kx-radio-box>
			<kx-radio-box :value="1">1: PC</kx-radio-box>
			<kx-radio-box :value="2">2: Android</kx-radio-box>
			<kx-radio-box :value="3">3: WindowsPhone</kx-radio-box>
		</kx-radio-box-group>`,
	data: () => ({ value: 1 }),
}), {
	notes: "My notes on some bold text",
});
