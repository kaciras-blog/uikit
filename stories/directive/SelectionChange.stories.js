import { vSelectionChange } from "../../src";

export default {};

export const SelectionChange = () => ({
	directives: {
		selectionChange: vSelectionChange,
	},
	template: `
		<textarea
			v-selection-change="handleChange"
			v-model="value"
			class="directive-textarea"
		/>
		<div>
		选择范围：
		{{ selection[0] }} - {{ selection[1] }}
		</div>
	`,
	data: () => ({
		value: "选择文字，下面显示被选中部分的起止位置",
		selection: [0, 0],
	}),
	methods: {
		handleChange(...selection) {
			this.selection = selection;
		},
	},
});
