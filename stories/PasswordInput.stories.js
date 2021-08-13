
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
