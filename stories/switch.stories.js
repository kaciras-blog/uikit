import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import KxSwitch from "../src/components/KxSwitch.vue";

const stories = storiesOf("Switch", module);

stories.addDecorator(withKnobs);

stories.add("switch", () => ({
	props: {
		disabled: {
			default: boolean("Disabled", false),
		},
	},
	components: { KxSwitch },
	template: `
		<div>
			这是一个切换按钮
			<kx-switch v-model="value" :disabled="disabled"></kx-switch>
		</div>`,
	data: () => ({ value: false }),
}));
