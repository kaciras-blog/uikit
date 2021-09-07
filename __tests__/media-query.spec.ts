import { nextTick } from "vue";
import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import { MediaBreakPoints, MediaQueryManager, SET_WIDTH } from "../src/media-query";

const DEFAULT_POINTS = {
	mobile: 768,
	tablet: 992,
	desktop: 1200,
	wide: 99999,
};

function createSuite(breakpoints: MediaBreakPoints, root: any) {
	const store = createStore({});
	const plugin = new MediaQueryManager(breakpoints);

	plugin.registerToStore(store);

	const app = shallowMount(root, { global: { plugins: [store, plugin] } }) as any;
	return { app, store };
}

test("$mediaMatch", () => {
	const { app } = createSuite(DEFAULT_POINTS, {
		inject: ["$mediaQuery"],
		template: "<div></div>",
	});

	expect(app.vm.$mediaQuery.match("wide")).toBe(true);
	expect(app.vm.$mediaQuery.match("desktop")).toBe(false);
});

/**
 * 测试提交变更到 Vuex 后是否触发 $mediaMatch 的更新
 */
test("responsive $mediaMatch", async () => {
	const { app, store } = createSuite(DEFAULT_POINTS, {
		template: `
			<div v-if="$mediaQuery.match('desktop+')">DESKTOP</div>
			<div v-else-if="$mediaQuery.match('mobile')">TABLET</div>
			`,
	});

	expect(app.html()).toContain("DESKTOP");
	expect(app.html()).not.toContain("TABLET");

	store.commit(SET_WIDTH, 768);
	await nextTick();
	expect(app.html()).toContain("TABLET");
});

test("watch", async () => {
	const { app, store } = createSuite(DEFAULT_POINTS, {
		inject: ["$mediaQuery"],
		template: "<div></div>",
	});

	const enterCb = jest.fn();
	const leaveCb = jest.fn();
	const unwatch = app.vm.$mediaQuery.watch("tablet-", enterCb, leaveCb);

	store.commit(SET_WIDTH, 500);
	await nextTick();
	expect(enterCb.mock.calls).toHaveLength(1);
	expect(leaveCb.mock.calls).toHaveLength(0);

	store.commit(SET_WIDTH, 800);
	await nextTick();
	expect(enterCb.mock.calls).toHaveLength(1);
	expect(leaveCb.mock.calls).toHaveLength(0);

	store.commit(SET_WIDTH, 1000);
	await nextTick();
	expect(enterCb.mock.calls).toHaveLength(1);
	expect(leaveCb.mock.calls).toHaveLength(1);

	store.commit(SET_WIDTH, 3840);
	await nextTick();
	expect(enterCb.mock.calls).toHaveLength(1);
	expect(leaveCb.mock.calls).toHaveLength(1);

	unwatch();
	store.commit(SET_WIDTH, 500);
	await nextTick();
	expect(enterCb.mock.calls).toHaveLength(1);
	expect(leaveCb.mock.calls).toHaveLength(1);
});

// TODO: 以下两个测试怎么 mock window.matchMedia ?
// test("breakpoints argument", () => {
// 	expect(() => createSuite({})).toThrow(Error);
// 	createSuite({ a: 100 });
// 	createSuite({ a: 100, b: 50 });
// });

// test("observeWindow", () => {
// 	const { store } = createSuite();
// 	observeWindow(store);
// 	const module = (store.state as any).mediaQuery;
//
// 	expect(module.screenWidth).toBe(Infinity);
// 	window.resizeTo(600, 1200);
// 	expect(module.screenWidth).toBe(768);
// });
