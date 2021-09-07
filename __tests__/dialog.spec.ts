import { DialogResult, DialogSession } from "../src/dialog/controller";

describe("DialogSession", () => {

	it("shouldn't resolve confirmPromise on cancelled", (done) => {
		const s = new DialogSession(Promise.resolve(DialogResult.CANCELED));
		s.confirmPromise.then(() => done.fail("DialogSession.confirmThen resolved"));
		setTimeout(done, 50);
	});

	it("should resolve confirmPromise with confirm", async () => {
		const sess = new DialogSession(Promise.resolve(DialogResult.confirm(555)));
		await sess.confirmPromise.then((value) => expect(value).toBe(555));
	});
});
