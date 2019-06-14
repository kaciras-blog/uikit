import { throttleFirst } from "../src/common";
import { PromiseCompletionSource } from "../src/PromiseDelegate";

test("throttleFirst avoid multiple calls", (done) => {
	let task!: PromiseCompletionSource<number>;
	const func = (a: number, b: number) => task = new PromiseCompletionSource();
	const throttled = throttleFirst(func);

	expect(throttled(5, 6)).toBe(throttled(3, 4));

	task.resolve(123);

	throttled(1, 2)
		.then(v => expect(v).toBe(123))
		.then(done);
});

test("throttleFirst call after first resolved", async () => {
	const func = (x: number) => Promise.resolve(x * x);
	const throttled = throttleFirst(func);

	await throttled(3).then(v => expect(v).toBe(9));
	await throttled(4).then(v => expect(v).toBe(16));
});
