/*
 * CancelToken没有完成状态，无法感知操作是否已经完成，也就无法在完成时取消定时器。
 * 这要求注册的取消回调必须在操作完成后也能调用，并不会破坏结果。
 */

/** 使用自定义的异常以便于其他异常做区分 */
export class OperationCancelledError extends Error {
	constructor() { super("The operation is cancelled"); }
}

export class CancelToken {

	get isCancelled() {
		return this.cancelled;
	}

	/**
	 * 获取一个Promise，在该CancelToken取消时resolve
	 */
	get promise() {
		if (this.cancelled) {
			return Promise.resolve();
		}
		if (!this.lazyPromise) {
			this.lazyPromise = new Promise((resolve) => this.callbacks.push(() => resolve()));
		}
		return this.lazyPromise;
	}

	/** 永远不会被取消的 CancelToken，该对象可以公用 */
	static readonly NEVER = new CancelToken();

	/**
	 * 创建CancelToken，其在指定的时间之后自动取消，当然也可以手动取消。
	 *
	 * @param timeout 超时时间（毫秒）
	 */
	static timeout(timeout: number) {
		return new TimeoutCancelToken(timeout);
	}

	protected cancelled: boolean = false;

	private readonly callbacks: Array<() => void> = [];

	private lazyPromise?: Promise<void>;

	cancel() {
		if (!this.cancelled) {
			this.cancelled = true;
			this.callbacks.forEach((cb) => cb());
		}
	}

	/**
	 * 注册一个回调函数，其将在该CancelToken取消时被调用，如果CancelToken已经取消则立即调用。
	 *
	 * @param callback 回调函数
	 */
	onCancel(callback: () => void) {
		if (this.cancelled) {
			callback();
		} else {
			this.callbacks.push(callback);
		}
	}

	throwIfRequested() {
		if (this.cancelled) { throw new OperationCancelledError(); }
	}
}

CancelToken.NEVER.cancel = CancelToken.NEVER.onCancel = () => {};

class TimeoutCancelToken extends CancelToken {

	readonly timeout: number;

	private readonly timer: number;

	constructor(timeout: number) {
		super();
		this.timeout = timeout;
		this.timer = setTimeout(super.cancel.bind(this), timeout);
	}

	cancel() {
		if (!this.cancelled) {
			super.cancel();
			clearTimeout(this.timer);
		}
	}
}
