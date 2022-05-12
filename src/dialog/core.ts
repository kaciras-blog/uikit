import { Component } from "vue";
import PromiseDelegate from "../PromiseDelegate";

export enum MessageType {
	Info,
	Success,
	Warning,
	Error,
}

/**
 * 表示弹窗会话的结果，当弹窗关闭时会返回此对象。
 *
 * isConfirm === true 表示用户确认了该弹窗的，其结果应当被处理；
 * 反之则代表该弹窗是意外关闭（切换页面等）或者用户忽略了弹窗。
 */
export class DialogResult<TData> {

	readonly data: TData;
	readonly isConfirm: boolean;

	constructor(data: TData, isConfirm: boolean) {
		this.data = data;
		this.isConfirm = isConfirm;
	}

	static CANCELED = new DialogResult<void>(undefined, false);

	static confirm<TResult>(data: TResult) {
		return new DialogResult(data, true);
	}
}

/**
 * 表示弹窗会话，在窗体关闭后 resolve，该类可以像 Promise 一样等待。
 */
export class DialogSession<TResult> extends PromiseDelegate<DialogResult<TResult>> {

	constructor(promise: Promise<DialogResult<TResult>>) {
		super(promise);
	}

	onConfirm(callback: (result: TResult) => void) {
		this.raw.then((rv) => {
			if (rv.isConfirm) callback(rv.data);
		});
		return this;
	}

	onCancel(callback: () => void) {
		this.raw.then((rv) => {
			if (!rv.isConfirm) callback();
		});
		return this;
	}

	/**
	 * 仅在确认后 resolve 的 Promise，如果是取消则永远不会 resolve。
	 * 可以用于仅关心确认情况的异步函数。
	 *
	 * 【实现】
	 * 不缓存这个 Promise，因为很少有多次等待同一个 Promise 的情况。
	 */
	get confirmPromise() {
		return new Promise<TResult>((resolve) => this.onConfirm(resolve));
	}
}

export interface DialogOptions<T> {
	props: T;
	resolve: (result: any) => void;
	component: Component<T> | string;
}

export interface MountPoint {

	push(config: DialogOptions<any>): void;

	clear(): void;

	close(result: DialogResult<unknown>): void;
}

export class QuickDialogController {

	private mountPoint?: MountPoint;

	constructor() {
		this.close = this.close.bind(this);
		this.confirm = this.confirm.bind(this);
	}

	connect(mountPoint: MountPoint) {
		this.mountPoint = mountPoint;
	}

	disconnect(mountPoint: MountPoint) {
		if (this.mountPoint === mountPoint) {
			this.mountPoint = undefined;
		}
	}

	/**
	 * 弹出一个窗口，返回处理弹窗结果的会话对象。
	 *
	 * @param component 弹窗组件名或组件选项
	 * @param props 传递给弹窗的Props
	 * @return 弹窗会话，用于接收窗口的返回数据
	 */
	show<R>(component: Component | string, props?: any) {
		const promise = new Promise<DialogResult<R>>(resolve => {
			this.mountPoint!.push({ component, props, resolve });
		});
		return new DialogSession<R>(promise);
	}

	/**
	 * 强制关闭所有弹窗，所有弹窗会话将返回 DialogResult.CANCELED
	 */
	clear() {
		this.mountPoint!.clear();
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
		this.mountPoint!.close(result);
	}
}

export interface ToastProps {
	type: MessageType;
	delay?: number;
	content: string;
}

export interface ToastMountPoint {
	clear(): void;
	push(options: ToastProps): void;
}

/**
 * 简单的消息提醒功能，消息的重要程度比消息框更低，因为布局的需要跟弹窗栈分开了。
 */
export class ToastController {

	mountPoint?: ToastMountPoint;

	show(options: ToastProps) {
		this.mountPoint!.push(options);
	}

	info(content: string) {
		this.show({ type: MessageType.Info, content });
	}

	success(content: string) {
		this.show({ type: MessageType.Success, content });
	}

	warning(content: string) {
		this.show({ type: MessageType.Warning, content });
	}

	error(content: string) {
		this.show({ type: MessageType.Error, content });
	}
}
