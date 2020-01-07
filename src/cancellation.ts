/**
 * 表示因取消而中断的异常，该异与DOM规范里的AbortError兼容。
 */
export class AbortError extends Error {

	name = "AbortError";

	constructor(message = "The operation is cancelled") { super(message); }
}

/*
 * 【注意】CancelToken没有完成状态，无法感知操作是否已经完成，也就无法在完成时取消定时器。
 * 这要求注册的取消回调必须在操作完成后也能调用，并不会破坏结果。
 */
export interface CancellationToken {

	isCancelled: boolean;

	promise(): Promise<void>;

	cancel(): void;

	addListener(listener: () => void): void

	throwIfRequested(): void;
}

class MutableToken implements CancellationToken {

	private readonly callbacks: Array<() => void> = [];

	protected cancelled = false;
	private lazyPromise?: Promise<void>;

	get isCancelled() {
		return this.cancelled;
	}

	promise() {
		if (this.cancelled) {
			return Promise.resolve();
		}
		if (!this.lazyPromise) {
			this.lazyPromise = new Promise((resolve) => this.callbacks.push(resolve));
		}
		return this.lazyPromise;
	}

	cancel() {
		if (!this.cancelled) {
			this.cancelled = true;
			this.callbacks.forEach((cb) => setTimeout(cb, 0));
		}
	}


	addListener(callback: () => void) {
		if (this.cancelled) {
			setTimeout(callback, 0);
		} else {
			this.callbacks.push(callback);
		}
	}

	throwIfRequested() {
		if (this.cancelled) {
			throw new AbortError();
		}
	}
}

export namespace CancellationToken {

	/**
	 * 创建一个 CancellationToken 的实例。
	 */
	export function create(parent?: CancellationToken) {
		const token = new MutableToken();
		if (parent) {
			parent.addListener(token.cancel.bind(token));
		}
		return token;
	}

	/**
	 * 永远不会被取消的 CancellationToken，该对象可以重复使用
	 */
	export const NEVER = Object.freeze<CancellationToken>({
		isCancelled: false,
		promise: () => new Promise<void>(() => {}),
		cancel() {},
		addListener() {},
		throwIfRequested() {},
	});

	/**
	 * 已经取消的 CancellationToken，该对象可以重复使用
	 */
	export const CANCELLED = Object.freeze<CancellationToken>({
		isCancelled: true,
		promise: Promise.resolve.bind(Promise),
		cancel() {},
		addListener(listener) { setTimeout(listener, 0); },
		throwIfRequested() { throw new AbortError(); },
	});
}
