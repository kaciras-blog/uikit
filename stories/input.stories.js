export default {
	title: "Input",
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const CheckBox = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `
		<div>
			<kx-check-box
				v-model="value"
				:disabled="disabled"
			>
				复选框
			</kx-check-box>
		</div>`,
	data: () => ({ value: false }),
});

CheckBox.args = {
	disabled: false,
};

export const Switch = () => ({
	template: `
		<div style="width: 300px">
			<kx-switch-box
				v-model="value"
				:disabled="disabled"
			>
				这是一个切换按钮
			</kx-switch-box>
		</div>
	`,
	data: () => ({ value: true }),
});

Switch.args = {
	disabled: false,
};

export const Password = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `
		<div style="width: 300px">
			<label for="input">
				请输入密码：
			</label>
			<kx-password-input
				style="margin-top: 10px"
				input-id="input"
				v-model="value"
				:disabled="disabled"
			/>
		</div>`,
	data: () => ({ value: "" }),
});

Password.args = {
	disabled: false,
};

export const Radio = () => ({
	template: `
		<kx-radio-box-group v-model="value" :disabled="disabled">
			<h1>Selected: {{value}}</h1>
			<kx-radio-box :value="0">0: Apple</kx-radio-box>
			<kx-radio-box :value="1">1: PC</kx-radio-box>
			<kx-radio-box :value="2">2: Android</kx-radio-box>
			<kx-radio-box :value="3">3: WindowsPhone</kx-radio-box>
		</kx-radio-box-group>`,
	data: () => ({ value: 1 }),
});

Radio.args = {
	disabled: false,
};
