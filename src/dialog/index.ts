import { VueConstructor } from 'vue';
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxContextMenu from "./KxContextMenu.vue";
import KxBaseDialog from "./KxBaseDialog.vue";
import KxStandardDialogButtons from "./KxStandardDialogButtons.vue";
import { DialogManager, DialogSession } from "@/dialog/controller";


export enum MessageBoxType {
	Info, Success, Warning, Error,
}

export interface MessageBoxOptions {
	title?: string;
	content?: string | string[];
	type?: MessageBoxType;
	cancelable?: boolean;
	dimmerClose?: boolean;
}

export interface KxDialogApi extends DialogManager {

	/**
	 * 显示内置的消息框
	 *
	 * @param options 选项
	 */
	messageBox(options: MessageBoxOptions): DialogSession<boolean>;

	/**
	 * 显示内置的消息框
	 *
	 * @param title 标题
	 * @param content 内容
	 * @param type 类型
	 */
	messageBox(title: string, content?: string | string[], type?: MessageBoxType): DialogSession<boolean>;

	contextMenu(component: any, event: MouseEvent, data?: object): void;
}

function messageBox(this: DialogManager,
					options: MessageBoxOptions | string,
					content?: string | string[],
					type?: MessageBoxType) {
	if (typeof options === "string") {
		options = { title: options, content, type }
	}
	return this.show(KxMessageBox, options);
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

	// noinspection JSUnusedGlobalSymbols
	Vue.prototype.$dialog = commands;

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

	// 自动插入 vs 手动插入?
	if (typeof window !== "undefined") {
		const instance = new Vue(KxDialogContainer).$mount();
		document.body.appendChild(instance.$el);
	}
}
