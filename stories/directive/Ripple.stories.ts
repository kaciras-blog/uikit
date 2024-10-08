import { StoryFn } from "@storybook/vue3";
import vRipple from "../../src/directives/ripple.ts";

export default {
	args: {
		centered: false,
		circle: false,
	},
	argTypes: {
		circle: {
			control: { type: "boolean" },
		},
		centered: {
			control: { type: "boolean" },
		},
	},
};

export const Ripple: StoryFn = (args) => ({
	data: () => args,
	directives: {
		ripple: vRipple,
	},
	// 用 key 防止复用元素导致指令更新失败
	template: `
		<div v-if="centered && circle" :key="0" class="mock-dialog" v-ripple.centered.circle></div>
		<div v-else-if="circle" :key="1" class="mock-dialog" v-ripple.circle></div>
		<div v-else-if="centered" :key="2" class="mock-dialog" v-ripple.centered></div>
		<div v-else class="mock-dialog" :key="3" v-ripple></div>
	`,
});
