import { OnFulfilled, OnRejected } from "./PromiseDelegate.ts";

export default class PromiseSource<T> implements Promise<T> {

	resolve!: (value: T | PromiseLike<T>) => void;
	reject!: (reason?: any) => void;

	protected readonly promise: Promise<T>;

	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject;
			this.resolve = resolve;
		});
	}

	get [Symbol.toStringTag]() {
		return "PromiseSource";
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
