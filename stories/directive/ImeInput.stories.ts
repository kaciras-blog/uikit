import vImeInput from "../../src/directives/ime-input.ts";

export default {
	title: "ImeInput",

};

export const ImeInput = () => ({
	directives: {
		imeInput: vImeInput,
	},
	template: `
		<label>
			<div>使用输入法输入一些文本：</div>
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
