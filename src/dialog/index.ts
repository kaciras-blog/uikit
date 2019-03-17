import Vue, { VueConstructor } from 'vue';
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxContextMenu from "./KxContextMenu.vue";
import KxBaseDialog from "./KxBaseDialog.vue";
import { boundClass } from "autobind-decorator";
import PromiseDelegate from "./PromiseDelegate";


export class DialogResult<TResult> {

	public readonly isConfirm: boolean;
	public readonly result: TResult;

	private constructor(isConfirm: boolean, result: TResult) {
		this.isConfirm = isConfirm;
		this.result = result;
	}

	static confirm<TResult>(result: TResult) {
		return new DialogResult(true, result);
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
			if (rv.isConfirm) callback(rv.result);
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
export class DialogProperty {

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
	 * 确认并关闭最上层的弹窗，并返回一个结果。
	 *
	 * @param data 返回给调用方的结果。
	 */
	confirm(data?: any) {
		this.eventBus.$emit("confirm", data);
	}

	/** 取消最上层的弹窗 */
	cancel() {
		this.eventBus.$emit("cancel");
	}

	/** 关闭所有弹窗，该方法不能传递结果 */
	clear() {
		this.eventBus.$emit("clear");
	}

	messageBox(options: MessageBoxOptions) {
		return this.show(KxMessageBox, options);
	}

	contextMenu(component: any, event: MouseEvent, data: object) {
		this.show(KxContextMenu, { component, event, data });
	}
}

export default function install(Vue: VueConstructor) {
	Vue.component(KxBaseDialog.name, KxBaseDialog);
	Vue.component(KxDialogContainer.name, KxDialogContainer);
	Vue.component(KxContextMenu.name, KxContextMenu);

	const commands = new DialogProperty();

	// noinspection JSUnusedGlobalSymbols
	Vue.prototype.$dialog = commands;


	// 指令不支持字面量，还得加个引号优点烦。
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

	const instance = new Vue(KxDialogContainer).$mount();
	document.body.appendChild(instance.$el);
}
