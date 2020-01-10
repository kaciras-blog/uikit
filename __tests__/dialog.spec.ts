import { DialogResult, DialogSession } from "../src/dialog/controller";
import { createLocalVue, mount } from "@vue/test-utils";

describe("DialogSession", () => {

	it("should't resolve confirmPromise on cancelled", (done) => {
		const s = new DialogSession(Promise.resolve(DialogResult.CANCELED));
		s.confirmPromise.then(() => done.fail("DialogSession.confirmThen resolved"));
		setTimeout(done, 50);
	});

	it("should resolve confirmPromise with confirm", async () => {
		const sess = new DialogSession(Promise.resolve(DialogResult.confirm(555)));
		await sess.confirmPromise.then((value) => expect(value).toBe(555));
	});
});

// 验证 provide 能够覆盖 prototype 上的属性
test("API inherent", () => {
	const localVue = createLocalVue();
	localVue.use((ctor) => ctor.prototype.$test = 1);

	const TestChild = {
		template: "<div id='value'>R:{{$test}}</div>",
		inject: ["$test"],
	};
	const parent = {
		template: "<div><test-child/></div>",
		components: { TestChild },
		provide: { $test: 2 },
	};
	const wrapper = mount(parent, { localVue });

	// @ts-ignore
	const accepted = /R:[^<]+/.exec(wrapper.html())[0];
	expect(accepted).toBe("R:2");
});
