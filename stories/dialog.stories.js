import LuckyNumber from "./LuckyNumberDialog";

export default {
	title: "Dialogs",
};

export const custom = () => ({
	components: {
		LuckyNumber,
	},
	template: `
		<kx-button @click="isOpen = true">算一下幸运数字</kx-button>
		<lucky-number v-model:open="isOpen"/>
	`,
	data:() => ({
		isOpen: false,
	}),
});

custom.storyName = "Custom";

// const applyAction = action("apply button click");
//
// export const buttons = () => ({
// 	template: `
// 		<div class="mock-dialog">
// 			<h1 class="mock-dialog-content">
// 				对话框框
// 			</h1>
// 			<kx-dialog-buttons
// 				:acceptable="acceptable"
// 				:cancel-button="cancelButton"
// 				@confirm="ok"
// 				@apply="apply"
// 				@cancel="cancel"
// 			/>
// 		</div>
// 	`,
// 	computed: {
// 		// 不能写在模板里，否则会被当作函数的内容
// 		apply() {
// 			return this.hasApplyListener && applyAction;
// 		},
// 	},
// 	methods: {
// 		cancel: action("cancel button click"),
// 		ok: action("accept button click"),
// 	},
// });
//
// buttons.storyName = "DialogButtons";
//
// buttons.args = {
// 	cancelButton: true,
// 	acceptable: true,
// 	hasApplyListener: false,
// };
//
// export const Frame = () => ({
// 	template: `
// 		<div>
// 			<kx-button class="primary" @click="show">
// 				显示弹出层
// 			</kx-button>
// 			<kx-dialog-container></kx-dialog-container>
// 		</div>`,
// 	methods: {
// 		show() {
// 			this.$dialog.show(DemoFrame);
// 		},
// 	},
// });
//
// Frame.storyName = "Frame";
//
// export const CloseHook = () => ({
// 	template: `
// 		<div>
// 			<kx-button class="primary" @click="show">
// 				显示
// 			</kx-button>
// 			<kx-dialog-container></kx-dialog-container>
// 		</div>`,
// 	methods: {
// 		show() {
// 			this.$dialog.show(HookedDialog);
// 		},
// 	},
// });
