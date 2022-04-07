import { Story } from "@storybook/vue3";
import { syncScroll } from "@";

export default {};

export const SyncScroll: Story = () => ({
	template: `
		<div class="sync-scroll">
			<textarea ref="a" :value="content"/>
			<textarea ref="b" :value="content"/>
		</div>
		<KxSwitchBox v-model="enabled">Enabled</KxSwitchBox>
	`,
	data() {
		let content = "";
		for (let i = 0; i < 100; i++) {
			content += `${i}\n`;
		}
		return { content, enabled: true };
	},
	watch: {
		enabled(value) {
			const { a, b } = this.$refs;
			if (value) {
				this.$_destroy = syncScroll(a, b);
			} else {
				this.$_destroy();
			}
		},
	},
	mounted() {
		this.$_destroy = syncScroll(this.$refs.a, this.$refs.b);
	},
});
