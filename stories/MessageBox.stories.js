import { MessageBoxType } from "@/dialog/quick-alert";
import KxMessageBox from "@/dialog/KxMessageBox";

export default {
	title: "MessageBox",
	component: KxMessageBox,
};

export const MessageBox = () => ({
	template: `
		<p class="btn-group">
			<kx-button class="primary" @click="success">成功</kx-button>
			<kx-button class="info" @click="info">信息</kx-button>
			<kx-button class="second" @click="warning">警告</kx-button>
			<kx-button class="dangerous" @click="error">错误</kx-button>
		</p>
		<p class="btn-group">
			<kx-button @click="custom">带有取消按钮</kx-button>
		</p>
		<kx-dialog-container></kx-dialog-container>
	`,
	methods: {
		success() {
			this.$dialog.alertSuccess("成功", "内容显示在这里");
		},

		info() {
			this.$dialog.alertInfo("有新的信息", "内容显示在这里");
		},

		warning() {
			const lines = new Array(30).fill("特别长的内容会出现滚动条");
			this.$dialog.alertWarning("警告", lines.join("\n"));
		},

		error() {
			this.$dialog.alertError("错误", "内容显示在这里");
		},

		custom() {
			this.$dialog.alert({
				type: MessageBoxType.Info,
				title: "带有取消按钮的消息框",
				content: "取消 = $dialog.close()\n确定 = $dialog.confirm()",
				cancelable: true,
			});
		},
	},
});
