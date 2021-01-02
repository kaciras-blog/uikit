// 这两个太长了单独拿出来
export type OnFulfilled<T, R> = ((value: T) => R | PromiseLike<R>) | undefined | null;
export type OnRejected<R> = ((reason: any) => R | PromiseLike<R>) | undefined | null;

/**
 * Promise不能直接继承，否则使用await的时候会出错，所以需要用代理的方式来扩展。
 */
export default abstract class PromiseDelegate<T> implements Promise<T> {

	protected readonly promise: Promise<T>;

	protected constructor(promise: Promise<T>) {
		this.promise = promise;
	}

	get [Symbol.toStringTag]() {
		return "PromiseDelegate";
	}

	then<R0 = T, R1 = never>(onFulfilled?: OnFulfilled<T, R0>, onRejected?: OnRejected<R1>) {
		return this.promise.then(onFulfilled, onRejected);
	}

	catch<R = never>(onRejected?: OnRejected<R>) {
		return this.promise.catch(onRejected);
	}

	finally(onFinally?: (() => void) | undefined | null) {
		return this.promise.finally(onFinally);
	}
}
