import { Meta, StoryFn } from "@storybook/vue3";
import KxButton from "../../src/input/KxButton.vue";
import KxAutoFocus from "../../src/directives/autofocus.ts";

export default { title: "Autofocus" } satisfies Meta;

export const Autofocus: StoryFn = () => ({
	// 为避免重名，加了个前缀 Kx，实际使用时不需要。
	directives: { KxAutoFocus },
	components: { KxButton },
	template: `
		<KxButton @click="visible = !visible">
			切换显示
		</KxButton>
		<p></p>
		<input v-if="visible" v-kx-auto-focus>
	`,
	data: () => ({ visible: false }),
});
