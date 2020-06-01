import { storiesOf } from "@storybook/vue";
import { syncScroll } from "../src";
import { boolean, withKnobs } from "@storybook/addon-knobs";

const stories = storiesOf("Scroll", module);
stories.addDecorator(withKnobs);

stories.add("syncScroll", () => ({
	props:{
		enable: {
			default: boolean("EnableSyncScroll", true),
		},
	},
	template: `
		<div class="sync-scroll">
			<textarea ref="a" :value="content"/>
			<textarea ref="b" :value="content"/>
		</div>`,
	data() {
		let content = "";
		for (let i = 0; i < 100; i++) {
			content += `${i}\n`;
		}
		return { content };
	},
	mounted() {
		syncScroll(this.$refs.a, this.$refs.b);
	},
}));
