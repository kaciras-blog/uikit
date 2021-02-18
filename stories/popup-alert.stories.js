import { button } from "@storybook/addon-knobs";
import PopupAlertContainer from "@/components/PopupAlertContainer";

export default {
	title: "PopupAlert",
};

export const popupAlert = () => ({
	components: {
		PopupAlertContainer,
	},
	template: `
		<popup-alert-container/>
	`,
	methods: {
		show() {
			this.$root.$emit("popup", { content: "评论提交成功" });
		},
	},
	created() {
		button("显示气泡通知", this.show);
	},
});

popupAlert.storyName = "PopupAlert";
