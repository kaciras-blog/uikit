import { action } from "@storybook/addon-actions";
import HookedDialog from "./HookedDialog.vue";
import LuckyNumber from "./LuckyNumberDialog.vue";

export default {
};

export const Custom = () => ({
	components: { LuckyNumber },
	template: `
		<KxButton @click="isOpen = true">
			算一下幸运数字
		</KxButton>
		<LuckyNumber
			v-if="isOpen" 
			@close="isOpen = false"
		/>
		<DialogContainer/>
	`,
	data: () => ({ isOpen: false }),
});

export const Buttons = args => ({
	template: `
		<div class="mock-dialog">
			<h1 class="mock-dialog-content">
				对话框框
			</h1>
			<KxDialogButtons
				:on-apply="applyEvent && apply"
				:on-cancel="cancelEvent && cancel"
				:on-accept="acceptEvent && accept"
			/>
		</div>
	`,
	data: () => args,
	methods: {
		apply: action("onApply"),
		cancel: action("onCancel"),
		accept: action("onAccept"),
	},
});

Buttons.args = {
	cancelEvent: true,
	acceptEvent: true,
	applyEvent: false,
};

export const BeforeDialogClose = args => ({
	template: `
		<KxButton @click="show">弹出对话框</KxButton>
		<DialogContainer/>
	`,
	methods: {
		show() {
			this.$dialog.show(HookedDialog);
		},
	},
});
