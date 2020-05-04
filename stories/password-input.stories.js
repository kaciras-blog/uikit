import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

const stories = storiesOf("PasswordInput", module);

stories.addDecorator(withKnobs);

stories.add("default", () => ({
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
