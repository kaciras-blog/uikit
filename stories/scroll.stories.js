import { syncScroll } from "@";

export default {
	argTypes: {
		enabled: {
			control: { type: "boolean" },
		},
	},
};

export const SyncScroll = () => ({
	props: {
		enabled: {
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
		enabled(value) {
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
});
