import { App, inject } from "vue";
import { DialogSession, MessageType, QuickDialogController, ToastController } from "./core";
import { default as KxMessageBox, MessageBoxProps } from "./KxMessageBox.vue";

export { QuickDialogController, DialogSession, MessageType };

const kDialog = Symbol("Dialog");
const kToast = Symbol("Toast");

/**
 * 全局的弹出层 API，通过调用方法来将组件挂载到 DialogContainer 中，通常用于弹窗。
 *
 * <2h>与挂载到模板的区别</h2>
 * 官方推荐把弹窗放在模板里，通过 teleport 挂到顶层，然后使用一个 ref 来控制开关。
 *
 * 本 API 与其相比有以下优势：
 * 1）无需额外添加一个是否显示的状态，代码更少。
 * 2）不会吧消息框等常用的组件搞得模板里到处都是。
 * 3）组件的 props 无需在 setup 函数中定义。
 *
 * 同时也有缺点：
 * 1）简单的同时也意味着灵活性更差，比如不支持 Fragment。
 *
 * 综上所述，本项目尝试不使用官方推荐的模式，仅用本 API 来实现所有弹窗。
 */
export class KxDialogAPI extends QuickDialogController {

	/**
	 * 显示内置的消息框，优先使用 title 来做一个简要的说明，如："操作失败"，内容部分可以省略。
	 *
	 * @param options 选项
	 */
	alert(options: MessageBoxProps) {
		return this.show<void>(KxMessageBox, options);
	}

	// 下面4个都是便捷方法，其中成功的消息往往仅用于提醒一下用户，所以有个有默认标题。

	alertInfo(title: string, content?: string) {
		return this.alert({ title, content, type: MessageType.Info });
	}

	alertWarning(title: string, content?: string) {
		return this.alert({ title, content, type: MessageType.Warning });
	}

	alertError(title: string, content?: string) {
		return this.alert({ title, content, type: MessageType.Error });
	}

	alertSuccess(title = "执行成功", content?: string) {
		return this.alert({ title, content, type: MessageType.Success });
	}
}

export function useDialog() {
	const value = inject<KxDialogAPI>(kDialog);
	if (import.meta.env.PROD || value) {
		return value!;
	}
	throw new Error("无法获取 $dialog，请确保加入了插件");
}

export function useToast() {
	const value = inject<ToastController>(kToast);
	if (import.meta.env.PROD || value) {
		return value!;
	}
	throw new Error("无法获取 $toast，请确保加入了插件");
}

export default function (app: App) {
	const $dialog = new KxDialogAPI();
	const $toast = new ToastController();

	app.provide(kDialog, $dialog);
	app.provide(kToast, $toast);

	// 加入全局属性，以兼容选项型组件。
	app.config.globalProperties.$dialog = $dialog;
	app.config.globalProperties.$toast = $toast;
}
