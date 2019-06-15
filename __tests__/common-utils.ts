import { throttleFirst } from "../src/common";
import { PromiseCompletionSource } from "../src/PromiseDelegate";

describe("throttleFirst", () => {

	it("should pass context", async () => {
		const obj = {
			value: 333,
			func() { return Promise.resolve(this.value); },
		};

		obj.func = throttleFirst(obj.func);
		expect(await obj.func()).toBe(333);
	});

	it("should avoid multiple calls", (done) => {
		let task!: PromiseCompletionSource<number>;
		const func = (a: number, b: number) => task = new PromiseCompletionSource();
		const throttled = throttleFirst(func);

		expect(throttled(5, 6)).toBe(throttled(3, 4));

		task.resolve(123);

		throttled(1, 2)
			.then(v => expect(v).toBe(123))
			.then(done);
	});

	it("should call after first resolved", async () => {
		const func = (x: number) => Promise.resolve(x * x);
		const throttled = throttleFirst(func);

		await throttled(3).then(v => expect(v).toBe(9));
		await throttled(4).then(v => expect(v).toBe(16));
	});
});

