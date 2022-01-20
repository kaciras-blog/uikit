import PopupAlert from "@/components/PopupAlert";

export default {
	title: "PopupAlert",
};

export const PopupAlert2 = {
	name: "PopupAlert",
	render: () => ({
		template: `
			<kx-button @click="show">显示气泡通知</kx-button>
			<kx-dialog-container/>
		`,
		methods: {
			show() {
				this.$dialog.show(PopupAlert, { content: "评论提交成功" })
			},
		},
	}),
};
