import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { MessageBoxType } from "@/dialog";
import DemoFrame from "./DemoFrame";
import LuckyNumber from "./LuckyNumberDialog";
import HookedDialog from "./HookedDialog";

export default {
	title: "Dialogs",
};

export const MessageBox = () => ({
	template: `
		<div>
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
		</div>`,
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
				showCancelButton: true,
			});
		},
	},
});

MessageBox.storyName = "MessageBox";

export const custom = () => ({
	template: `
		<div>
			<kx-button @click="showDialog">算一下幸运数字</kx-button>
			<kx-dialog-container/>
		</div>`,
	methods: {
		showDialog() {
			this.$dialog.show(LuckyNumber);
		},
	},
});

custom.storyName = "Custom";

const applyAction = action("apply button click");

export const buttons = () => ({
	props: {
		cancelButton: {
			default: boolean("cancelButton", true),
		},
		acceptable: {
			default: boolean("acceptable", true),
		},
		hasApplyListener: {
			default: boolean("has apply action", false),
		},
	},
	template: `
		<div class="mock-dialog">
			<h1 class="mock-dialog-content">
				对话框框
			</h1>
			<kx-dialog-buttons
				:acceptable="acceptable"
				:cancel-button="cancelButton"
				@confirm="ok"
				@apply="apply"
				@cancel="cancel"
			/>
		</div>
	`,
	computed: {
		// 不能写在模板里，否则会被当作函数的内容
		apply() {
			return this.hasApplyListener && applyAction;
		},
	},
	methods: {
		cancel: action("cancel button click"),
		ok: action("accept button click"),
	},
});

buttons.storyName = "DialogButtons";

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

Frame.storyName = "Frame";

export const CloseHook = () => ({
	template: `
		<div>
			<kx-button class="primary" @click="show">
				显示
			</kx-button>
			<kx-dialog-container></kx-dialog-container>
		</div>`,
	methods: {
		show() {
			this.$dialog.show(HookedDialog);
		},
	},
});

CloseHook.storyName = "CloseHook";
