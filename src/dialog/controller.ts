// vue-jest 不支持 babel 7，所以必须把与vue文件相关的部分分开。
// 该文件包含弹窗的核心API，index.ts里会增加一些具体的弹窗API。
import Vue from "vue";
import PromiseDelegate, { OnFulfilled } from "../PromiseDelegate";
import { boundClass } from "autobind-decorator";

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

/**
 * 表示弹窗会话，该类实现了Promise接口可以像Promise一样等待，在窗体关闭后resolve。
 */
export class DialogSession<TResult> extends PromiseDelegate<DialogResult<TResult>> {

	private dialogResult?: DialogResult<TResult>;

	private confirmPromise?: Promise<any>;

	constructor(promise: Promise<DialogResult<TResult>>) {
		super(promise);
		promise.then(rv => this.dialogResult = rv);
	}

	onConfirm(callback: (result: TResult) => void) {
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

	/**
	 * 类似于 Promise.then 但是只在 confirm 状态下才会 resolve.
	 */
	confirmThen<R>(onFulfilled: OnFulfilled<TResult, R>) {
		if (!this.confirmPromise) {
			this.confirmPromise = new Promise<TResult>(resolve => this.onConfirm(resolve));
		}
		return this.confirmPromise.then(onFulfilled);
	}
}

type PropsData = { [key: string]: any };

export interface DialogOptions {
	component: Vue;
	props: PropsData;

	resolve(result: DialogResult<any>): void;
}


@boundClass
export class DialogManager {

	public readonly eventBus = new Vue();

	/**
	 * 弹出一个窗口。
	 *
	 * @param component 弹窗组件
	 * @param props 传递给弹窗的数据
	 * @return 弹窗会话，用于接收窗口的返回数据
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
}