import DemoFrame from "./DemoFrame";

export default {};

export const Frame = () => ({
	template: `
		<KxButton class="primary" @click="show">
			显示弹出层
		</KxButton>
		<DialogContainer/>
	`,
	methods: {
		show() {
			this.$dialog.show(DemoFrame);
		},
	},
});
