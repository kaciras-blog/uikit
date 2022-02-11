import DemoFrame from "./DemoFrame";

export default {
};

export const Frame = () => ({
	template: `
		<div>
			<kx-button class="primary" @click="show">
				显示弹出层
			</kx-button>
			<kx-dialog-container></kx-dialog-container>
		</div>`,
	methods: {
		show() {
			this.$dialog.show(DemoFrame);
		},
	},
});
