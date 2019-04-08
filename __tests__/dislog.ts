import { DialogResult, DialogSession } from "@/dialog/controller";

describe('DialogSession', () => {
	it("should't resolve confirmThen", (done) => {
		const s = new DialogSession(Promise.resolve(DialogResult.CANCELED));
		s.confirmThen(() => done.fail("DialogSession.confirmThen resolved"));
		setTimeout(done, 20);
	});
});

describe('', () => {

});
