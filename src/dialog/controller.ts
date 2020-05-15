// vue-jest 不支持 babel 7，所以必须把与vue文件相关的部分分开。
// 该文件包含弹窗的核心API，index.ts里会增加一些具体的弹窗API。
import Vue, { VueConstructor } from "vue";
import PromiseDelegate from "../PromiseDelegate";
import { boundClass } from "autobind-decorator";

/**
 * 表示弹窗会话的结果，当弹窗关闭时会返回此对象。
 *
 * isConfirm === true 表示用户确认了该弹窗的，其结果应当被处理；
 * 反之则代表该弹窗是意外关闭（切换页面等）或者用户忽略了弹窗。
 */
export class DialogResult<TData> {

	static CANCELED = new DialogResult<undefined>(false, undefined);

	static confirm<TResult>(data: TResult) {
		return new DialogResult(true, data);
	}

	private constructor(readonly isConfirm: boolean, readonly data: TData) {}
}

/**
 * 表示弹窗会话，该类实现了Promise接口可以像Promise一样等待，在窗体关闭后resolve。
 */
export class DialogSession<TResult> extends PromiseDelegate<DialogResult<TResult>> {

	private dialogResult?: DialogResult<TResult>;

	constructor(promise: Promise<DialogResult<TResult>>) {
		super(promise);
		promise.then((rv) => this.dialogResult = rv);
	}

	onConfirm(callback: (result: TResult) => void) {
		this.promise.then((rv) => {
			if (rv.isConfirm) callback(rv.data);
		});
		return this;
	}

	onCancel(callback: () => void) {
		this.promise.then((rv) => {
			if (!rv.isConfirm) callback();
		});
		return this;
	}

	/**
	 * 仅在确认后resolve的Promise，如果是取消则永远不会resolve。
	 * 可以用于仅关心确认情况的异步函数。
	 *
	 * 【实现】不缓存这个Promise，因为很少有多次等待同一个Promise的情况。
	 */
	get confirmPromise() {
		return new Promise<TResult>((resolve) => this.onConfirm(resolve));
	}
}

interface PropsData {
	readonly [key: string]: any;
}

export interface DialogOptions {
	component: Vue;
	props: PropsData;

	resolve(result: DialogResult<any>): void;
}

@boundClass
export class DialogManager {

	readonly eventBus = new Vue();

	/**
	 * 弹出一个窗口，返回处理弹窗结果的会话对象。
	 *
	 * @param component 弹窗组件名或组件选项
	 * @param props 传递给弹窗的Props
	 * @return 弹窗会话，用于接收窗口的返回数据
	 */
	show<T = any>(component: VueConstructor | string, props?: PropsData) {
		const promise = new Promise<DialogResult<T>>((resolve) => {
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

	/**
	 * 强制关闭所有弹窗，所有弹窗会话将返回 DialogResult.CANCELED
	 */
	clear() {
		this.eventBus.$emit("clear");
	}
}
