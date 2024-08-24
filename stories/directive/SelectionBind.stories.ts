import { Meta, StoryFn } from "@storybook/vue3";
import vBindSelection from "../../src/directives/selection-bind.ts";

export default {} satisfies Meta;

export const SelectionBind: StoryFn = () => ({
	directives: {
		bindSelection: vBindSelection,
	},
	template: `
		<textarea
			v-bind-selection.focus="selection"
			v-model="value"
			class="directive-textarea"
		/>
		<div class="row">
			<input type="number" v-model="selection[0]">
			&nbsp;-&nbsp;
			<input type="number" v-model="selection[1]">
		</div>
	`,
	data: () => ({
		selection: [0, 0],
		value: "调整下面的 start 和 end，改变文本框的选择区域",
	}),
});
