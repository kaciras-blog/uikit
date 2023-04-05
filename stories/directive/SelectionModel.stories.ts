import { StoryFn } from "@storybook/vue3";
import { vSelectionModel } from "../../src";

export default {
	title: "SelectionModel",

};

export const SelectionModel: StoryFn = () => ({
	template: `
		<textarea
			v-selection-model.focus="'selection'"
			v-model="value"
			class="directive-textarea"
		/>
		<div>选择范围：{{ selection[0] }} - {{ selection[1] }}</div>
		<kx-button @click="randomSelection">随机选择</kx-button>
	`,
	directives: {
		selectionModel: vSelectionModel,
	},
	data: () => ({
		value: "调整下面的start和end，改变文本框的选择区域",
		selection: [0, 0],
	}),
	methods: {
		randomSelection() {
			const n = this.value.length;
			const s = Math.floor(Math.random() * n);
			const e = s + Math.floor(Math.random() * (n - s));
			this.selection = [s, e];
		},
	},
});
