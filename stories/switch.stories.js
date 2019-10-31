import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from '@storybook/addon-knobs';
import "../src/css/Index.less";
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
	template: `<kx-switch v-model="value" :disabled="disabled"></kx-switch>`,
	data: () => ({ value: false }),
}));
