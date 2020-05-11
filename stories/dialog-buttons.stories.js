import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/vue";

const stories = storiesOf("DialogButtons", module);
stories.addDecorator(withKnobs);

const applyAction = action("apply button click");

stories.add("standard buttons", () => ({
	props: {
		hasApplyListener: {
			default: boolean("has apply action", false),
		},
		cancelButton: {
			default: boolean("cancelButton", true),
		},
		acceptable: {
			default: boolean("acceptable", true),
		},
	},
	template: `
		<div class="mock-dialog">
			<h1 class="mock-dialog-content">
				对话框框
			</h1>
			<kx-standard-dialog-buttons
				:acceptable="acceptable"
				:cancel-button="cancelButton"
				@confirm="ok"
				@apply="apply"
				@cancel="cancel"
			/>
		</div>
	`,
	computed: {
		// 不能写在模板里，否则会被当作函数的内容
		apply() {
			return this.hasApplyListener && applyAction;
		},
	},
	methods: {
		cancel: action("cancel button click"),
		ok: action("accept button click"),
	},
}));
