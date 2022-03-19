import { ref } from "vue";
import { vSelectionChange } from "../../src";

export default {};

export const SelectionChange = () => ({
	directives: {
		selectionChange: vSelectionChange,
	},
	template: `
		<textarea
			v-selection-change="fn"
			v-model="value"
			class="directive-textarea"
		/>
		<textarea
			v-selection-change="selA"
			v-model="value"
			class="directive-textarea"
		/>
		<div>
		选择范围：
		{{ selA[0] }} - {{ selA[1] }}
		</div>
	`,
	setup() {
		const value = "选择文字，下面显示被选中部分的起止位置";
		const selA = ref([0, 0]);
		const fn = (s, e) => selA.value = [s, e];
		return { value, selA, fn };
	},
});
