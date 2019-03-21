import Vue, { VueConstructor } from 'vue';
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxContextMenu from "./KxContextMenu.vue";
import KxBaseDialog from "./KxBaseDialog.vue";
import { boundClass } from "autobind-decorator";
import PromiseDelegate from "../PromiseDelegate";
import KxStandardDialogButtons from "./KxStandardDialogButtons.vue";


export class DialogResult<TData> {

	public readonly isConfirm: boolean;
	public readonly data: TData;

	private constructor(isConfirm: boolean, data: TData) {
		this.isConfirm = isConfirm;
		this.data = data;
	}

	static confirm<TResult>(data: TResult) {
		return new DialogResult(true, data);
	}

	static CANCELED = new DialogResult<undefined>(false, undefined);
}

export class DialogSession<TResult> extends PromiseDelegate<DialogResult<TResult>> {

	private dialogResult?: DialogResult<TResult>;

	constructor(promise: Promise<DialogResult<TResult>>) {
		super(promise);
		promise.then(rv => this.dialogResult = rv);
	}

	onComfirm(callback: (result: TResult) => void) {
		this.promise.then(rv => {
			if (rv.isConfirm) callback(rv.data);
		});
		return this;
	}

	onCancel(callback: () => void) {
		this.promise.then(rv => {
			if (!rv.isConfirm) callback();
		});
		return this;
	}

	onClose(callback: () => void) {
		this.promise.then(callback);
		return this;
	}
}

type PropsData = { [key: string]: any };

export interface DialogOptions {
	component: Vue;
	props: PropsData;

	resolve(result: DialogResult<any>): void;
}

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

@boundClass
export class DialogManager {

	public readonly eventBus = new Vue();

	/**
	 * 弹出一个窗口。
	 *
	 * @param component 弹窗组件
	 * @param props 传递给弹窗的数据
	 * @return DialogSession
	 */
	show(component: any, props?: PropsData) {
		const promise = new Promise<DialogResult<any>>(resolve => {
			this.eventBus.$emit("show", { component, props, resolve });
		});
		return new DialogSession(promise);
	}

	/**
	 * 确认并关闭最上层的弹窗，并返回一个结果。相当于 {@code close(DialogResult.confirm(data))}
	 *
	 * @param data 返回给调用方的数据。
	 */
	confirm(data?: any) {
		this.close(DialogResult.confirm(data));
	}

	/**
	 * 关闭最上层的弹窗，可以传递一个参数来表示弹窗会话的结果。
	 *
	 * @param result 弹窗会话的结果
	 */
	close(result: DialogResult<any> = DialogResult.CANCELED) {
		this.eventBus.$emit("close", result);
	}

	/** 关闭所有弹窗，该方法不能传递结果，所有弹窗会话将返回 DialogResult.CANCELED */
	clear() {
		this.eventBus.$emit("clear");
	}

	messageBox(options: MessageBoxOptions) {
		return this.show(KxMessageBox, options);
	}

	contextMenu(component: any, event: MouseEvent, data?: object) {
		this.show(KxContextMenu, { component, event, data });
	}
}

export default function install(Vue: VueConstructor) {
	Vue.component(KxBaseDialog.name, KxBaseDialog);
	Vue.component(KxDialogContainer.name, KxDialogContainer);
	Vue.component(KxContextMenu.name, KxContextMenu);
	Vue.component(KxStandardDialogButtons.name, KxStandardDialogButtons);

	const commands = new DialogManager();

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
