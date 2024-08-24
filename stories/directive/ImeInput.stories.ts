import { Meta, StoryFn } from "@storybook/vue3";
import vImeInput from "../../src/directives/ime-input.ts";

export default {} satisfies Meta;

export const ImeInput: StoryFn = () => ({
	directives: {
		imeInput: vImeInput,
	},
	template: `
		<label>
			<span>使用输入法输入一些文本：</span>
			<textarea
				v-ime-input="e => imeValue = e.target.value"
				@input="e => value = e.target.value"
				@change="e => changeValue = e.target.value"
			/>
		</label>
		<div class="ime-input-result">
			<p>input 事件：{{ value }}</p>
			<p>change 事件：{{ changeValue }}</p>
			<p>v-ime-input：{{ imeValue }}</p>
		</div>
	`,
	data: () => ({ value: "", changeValue: "", imeValue: "" }),
});
