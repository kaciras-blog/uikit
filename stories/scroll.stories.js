import { storiesOf } from "@storybook/vue";
import { scrollToElementEnd, scrollToElementStart, syncScroll } from "../src";
import { boolean, button, withKnobs } from "@storybook/addon-knobs";

const stories = storiesOf("Scroll", module);
stories.addDecorator(withKnobs);

stories.add("syncScroll", () => ({
	props: {
		enable: {
			default: boolean("Enabled", true),
		},
	},
	template: `
		<div class="sync-scroll">
			<textarea ref="a" :value="content"/>
			<textarea ref="b" :value="content"/>
		</div>
	`,
	data() {
		let content = "";
		for (let i = 0; i < 100; i++) {
			content += `${i}\n`;
		}
		return { content };
	},
	watch: {
		enable(value) {
			if (value) {
				this.$_destroy = syncScroll(this.$refs.a, this.$refs.b);
			} else {
				this.$_destroy();
			}
		},
	},
	mounted() {
		this.$_destroy = syncScroll(this.$refs.a, this.$refs.b);
	},
}));

stories.add("ScrollTo", () => ({
	template: `
		<div style="height: 200vh"><div ref="target" class="scroll-to-box"/></div>
	`,
	methods: {
		scrollToStart() {
			scrollToElementStart(this.$refs.target);
		},
		scrollToEnd() {
			scrollToElementEnd(this.$refs.target);
		},
	},
	created() {
		button("ScrollToStart", this.scrollToStart);
		button("ScrollToEnd", this.scrollToEnd);
	},
}));
