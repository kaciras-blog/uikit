import { action } from "@storybook/addon-actions";
import LuckyNumber from "./LuckyNumberDialog";

export default {
	title: "Dialogs",
};

export const Custom = {
	render: () => ({
		components: {
			LuckyNumber,
		},
		template: `
			<kx-button @click="isOpen = true">算一下幸运数字</kx-button>
			<lucky-number v-if="isOpen" @close="isOpen=false"/>
			<kx-dialog-container></kx-dialog-container>
		`,
		data: () => ({
			isOpen: false,
		}),
	}),
};


export const Buttons = args => ({
	template: `
		<div class="mock-dialog">
			<h1 class="mock-dialog-content">
				对话框框
			</h1>
			<kx-dialog-buttons
				:on-cancel="cancelEvent && cancel"
				:on-accept="acceptEvent && accept"
				:on-apply="applyEvent && apply"
			/>
		</div>
	`,
	data: () => args,
	methods: {
		cancel: action("onCancel"),
		accept: action("onAccept"),
		apply: action("onApply"),
	},
});

Buttons.args = {
	cancelEvent: true,
	acceptEvent: true,
	applyEvent: false,
};
