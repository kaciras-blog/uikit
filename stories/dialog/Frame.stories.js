import DemoFrame from "./DemoFrame";

export default {
};

export const Frame = () => ({
	template: `
		<div>
			<KxButton class="primary" @click="show">
				显示弹出层
			</KxButton>
			<KxDialogContainer/>
		</div>`,
	methods: {
		show() {
			this.$dialog.show(DemoFrame);
		},
	},
});
