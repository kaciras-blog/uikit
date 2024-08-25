import { OnFulfilled, OnRejected } from "@kaciras/utilities/browser";

/**
 * Promise不能直接继承，否则使用await的时候会出错，所以需要用代理的方式来扩展。
 */
export default abstract class PromiseDelegate<T> implements Promise<T> {

	readonly raw: Promise<T>;

	protected constructor(promise: Promise<T>) {
		this.raw = promise;
	}

	get [Symbol.toStringTag]() {
		return "PromiseDelegate";
	}

	then<R = T, E = never>(
		onFulfilled?: OnFulfilled<T, R>,
		onRejected?: OnRejected<E>,
	) {
		return this.raw.then(onFulfilled, onRejected);
	}

	catch<R = never>(onRejected?: OnRejected<R>) {
		return this.raw.catch(onRejected);
	}

	finally(onFinally?: (() => void) | undefined | null) {
		return this.raw.finally(onFinally);
	}
}
