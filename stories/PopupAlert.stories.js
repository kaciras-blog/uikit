import PopupAlertContainer from "@/components/PopupAlertContainer";

export default {
	title: "PopupAlert",
};

export const PopupAlert = {
	name: "PopupAlert",
	render: () => ({
		components: {
			PopupAlertContainer,
		},
		template: `
			<kx-button @click="show">显示气泡通知</kx-button>
			<popup-alert-container/>
		`,
		methods: {
			show() {
				this.$root.$emit("popup", {
					content: "评论提交成功",
				});
			},
		},
	}),
};
