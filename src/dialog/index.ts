import { VueConstructor } from "vue";
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxContextMenu from "./KxContextMenu.vue";
import KxBaseDialog from "./KxBaseDialog.vue";
import KxStandardDialogButtons from "./KxStandardDialogButtons.vue";
import { DialogManager, DialogSession } from "./controller";

export { DialogManager, DialogSession };

export enum MessageBoxType {
	Info, Success, Warning, Error,
}

export interface MessageBoxOptions {
	content: string;
	title?: string;
	type?: MessageBoxType;

	/** 是否显示取消按钮 */
	cancelable?: boolean;

	/** 是否启用点击遮罩关闭、Esc键关闭和右上角的关闭按钮 */
	quickClose?: boolean;
}

export interface KxDialogApi extends DialogManager {

	/**
	 * 显示内置的消息框
	 *
	 * @param options 选项
	 */
	messageBox(options: MessageBoxOptions): DialogSession<boolean>;

	/**
	 * 弹出一个消息框
	 *
	 * @param message 内容
	 * @param title 标题，默认是 "消息"
	 * @param type 类型
	 */
	messageBox(message: string, title?: string, type?: MessageBoxType): DialogSession<boolean>;

	/**
	 * 错误框用得很多，专门加个便捷方法
	 *
	 * @param message 错误消息
	 * @param title 可选的标题，默认是 "错误"
	 */
	errorBox(message: string, title?: string): DialogSession<boolean>;

	contextMenu(component: any, event: MouseEvent, data?: object): void;
}

function messageBox(this: DialogManager,
					options: MessageBoxOptions | string,
					title?: string,
					type?: MessageBoxType) {

	if (typeof options === "string") {
		options = { content: options, title, type };
	}
	return this.show(KxMessageBox, options);
}

function errorBox(this: KxDialogApi, message: string, title: string = "错误") {
	return this.messageBox(message, title, MessageBoxType.Error);
}

function contextMenu(this: DialogManager, component: any, event: MouseEvent, data?: object) {
	this.show(KxContextMenu, { component, event, data });
}

export default function install(Vue: VueConstructor) {
	Vue.component(KxBaseDialog.name, KxBaseDialog);
	Vue.component(KxDialogContainer.name, KxDialogContainer);
	Vue.component(KxContextMenu.name, KxContextMenu);
	Vue.component(KxStandardDialogButtons.name, KxStandardDialogButtons);

	const commands = new DialogManager() as KxDialogApi;
	commands.messageBox = messageBox.bind(commands);
	commands.contextMenu = contextMenu.bind(commands);
	commands.errorBox = errorBox.bind(commands);

	// 指令不支持字面量，还得加个引号有点烦。
	Vue.directive("context-menu", {
		bind(el, { arg, value }, vnode) {
			const vm = vnode.context as any; // 烦人
			if (typeof value === "string") {
				value = vm.$options.components[value] || value;
			}
			el.addEventListener("contextmenu", event => {
				event.preventDefault();
				commands.contextMenu(value, event, arg && vm[arg]);
			});
		},
	});

	// noinspection JSUnusedGlobalSymbols
	Vue.prototype.$dialog = commands;
}
