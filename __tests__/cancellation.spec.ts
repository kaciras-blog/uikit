// noinspection TypeScriptPreferShortImport
import { CancellationToken } from "../src/cancellation";

jest.useFakeTimers();

test("cancel before token", (done) => {
	const token = CancellationToken.create();

	expect(token.isCancelled).toBe(false);
	token.cancel();
	expect(token.isCancelled).toBe(true);

	token.addListener(done);
	jest.runAllTimers();
});

test("cancel happens only once", () => {
	const token = CancellationToken.create();

	let cancelCount = 0;
	token.addListener(() => cancelCount += 1);

	token.cancel();
	token.cancel();
	jest.runAllTimers();

	expect(cancelCount).toBe(1);
});

test("cancel calls all listeners", () => {
	const token = CancellationToken.create();

	let count = 0;
	token.addListener(() => count += 1);
	token.addListener(() => count += 1);
	token.addListener(() => count += 1);

	token.cancel();
	jest.runAllTimers();

	expect(count).toBe(3);
});

test("parent cancels child", () => {
	const parent = CancellationToken.create();
	const child = CancellationToken.create(parent);

	let count = 0;
	child.addListener(() => count += 1);

	parent.cancel();
	jest.runAllTimers();

	expect(count).toBe(1);
	expect(parent.isCancelled).toBe(true);
	expect(child.isCancelled).toBe(true);
});

test("NEVER", (done) => {
	const token = CancellationToken.NEVER;

	expect(token.isCancelled).toBe(false);
	token.throwIfRequested();
	token.promise().then(() => done.fail());
	token.addListener(() => done.fail());

	jest.runAllTimers();
	Promise.resolve().then(done);
});

test("CANCELLED", async () => {
	const token = CancellationToken.CANCELLED;
	let count = 0;

	expect(token.isCancelled).toBe(true);
	expect(() => token.throwIfRequested()).toThrow();
	token.promise().then(() => count += 1);
	token.addListener(() => count += 1);

	// 确保 addListener 和 promise 两个异步任务触发
	jest.runAllTimers();
	await Promise.resolve();

	expect(count).toBe(2);
});
