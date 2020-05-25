import { storiesOf } from "@storybook/vue";
import { boolean, withKnobs } from "@storybook/addon-knobs";

const stories = storiesOf("CheckBox", module);

stories.addDecorator(withKnobs);

stories.add("simple", () => ({
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
