import ThirdPartyAbortController from "abort-controller";

/*
 * 在浏览器环境（全局对象为window）和 WebWorker（全局对象为self）使用内置的 AbortController，
 * 其他情况使用第三方实现。
 *
 * 如果在编译期能够得知全局对象的存在与否，就应该能 Tree-Shaking 优化掉 abort-controller 的导入。
 */
const _AbortController: typeof AbortController =
	typeof window !== "undefined" && typeof self !== "undefined"
		? AbortController : ThirdPartyAbortController;

// @formatter:off

/**
 * 永远不会被中断的AbortSignal，该对象可以重复使用。
 */
export const NEVER_ABORT_SIGNAL: AbortSignal = {
	aborted: false,
	onabort() {},
	dispatchEvent() { return false;	},
	addEventListener() {},
	removeEventListener() {},
};

/**
 * 无法中断的AbortController，调用其abort方法不会产生任何效果，该对象可以重复使用。
 */
export const NO_OP_CONTROLLER: AbortController = {
	abort() {},
	signal: NEVER_ABORT_SIGNAL,
};

// @formatter:on

Object.freeze(NEVER_ABORT_SIGNAL);
Object.freeze(NO_OP_CONTROLLER);

/**
 * 创建一个在指定的时间之后自动取消的AbortController，当然也可以手动取消。
 *
 * @param timeout 超时时间（毫秒）
 */
export function abortTimeout(timeout: number) {
	const controller = new _AbortController();
	setTimeout(controller.abort.bind(controller), timeout);
	return controller;
}

/**
 * 从AbortSignal创建一个Promise，在其中断时resolve.
 *
 * @param signal 要等待的AbortSignal
 */
export function abortPromise(signal: AbortSignal) {
	return new Promise(resolve => signal.addEventListener("abort", resolve));
}

/**
 * 表示操作取消的异常。
 */
export class AbortError extends Error {
	constructor(message?: string) {
		super(message || "The operation is aborted");
	}
}
