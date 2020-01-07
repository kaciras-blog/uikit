import "@/media-query/shims-media-query.d.ts";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import { MediaBreakPoints, MediaQueryManager, SET_WIDTH } from "@/media-query";

const DEFAULT_POINTS = {
	mobile: 768,
	tablet: 992,
	desktop: 1200,
	wide: 99999,
};

function createVueSuite(breakpoints: MediaBreakPoints) {
	const localVue = createLocalVue();
	localVue.use(Vuex);

	const plugin = new MediaQueryManager(breakpoints);
	localVue.use(plugin);

	const store = new Vuex.Store({});
	plugin.registerToStore(store);
	return { plugin, localVue, store };
}

test("$mediaMatch", () => {
	const suite = createVueSuite(DEFAULT_POINTS);
	const wrapper = shallowMount({ render(h) { return h("div"); } }, suite);

	expect(wrapper.vm.$mediaQuery.match("wide")).toBe(true);
	expect(wrapper.vm.$mediaQuery.match("desktop")).toBe(false);
});

/**
 * 测试提交变更到 Vuex 后是否触发 $mediaMatch 的更新
 */
test("responsive $mediaMatch", async () => {
	const suite = createVueSuite(DEFAULT_POINTS);
	const wrapper = shallowMount({
		template: `
			<div v-if="$mediaQuery.match('desktop+')">DESKTOP</div>
			<div v-else-if="$mediaQuery.match('mobile')">TABLET</div>
			`,
	}, suite);

	expect(wrapper.html()).toContain("DESKTOP");
	expect(wrapper.html()).not.toContain("TABLET");

	suite.store.commit(SET_WIDTH, 768);
	await Vue.nextTick();
	expect(wrapper.html()).toContain("TABLET");
});

test("watch", async () => {
	const suite = createVueSuite(DEFAULT_POINTS);
	const wrapper = shallowMount({ render(h) { return h("div"); } }, suite);

	const mq = wrapper.vm.$mediaQuery;
	const enterCb = jest.fn();
	const leaveCb = jest.fn();
	const unwatch = mq.watch("tablet-", enterCb, leaveCb);

	suite.store.commit(SET_WIDTH, 500);
	await Vue.nextTick();
	expect(enterCb.mock.calls.length).toBe(1);
	expect(leaveCb.mock.calls.length).toBe(0);

	suite.store.commit(SET_WIDTH, 800);
	await Vue.nextTick();
	expect(enterCb.mock.calls.length).toBe(1);
	expect(leaveCb.mock.calls.length).toBe(0);

	suite.store.commit(SET_WIDTH, 1000);
	await Vue.nextTick();
	expect(enterCb.mock.calls.length).toBe(1);
	expect(leaveCb.mock.calls.length).toBe(1);

	suite.store.commit(SET_WIDTH, 3840);
	await Vue.nextTick();
	expect(enterCb.mock.calls.length).toBe(1);
	expect(leaveCb.mock.calls.length).toBe(1);

	unwatch();
	suite.store.commit(SET_WIDTH, 500);
	await Vue.nextTick();
	expect(enterCb.mock.calls.length).toBe(1);
	expect(leaveCb.mock.calls.length).toBe(1);
});

// TODO: 以下两个测试怎么 mock window.matchMedia ?
test("breakpoints argument", () => {
	expect(() => createVueSuite({})).toThrow(Error);
	createVueSuite({ a: 100 });
	createVueSuite({ a: 100, b: 50 });
});

// test("observeWindow", () => {
// 	const { store } = createVueSuite();
// 	observeWindow(store);
// 	const module = (store.state as any).mediaQuery;
//
// 	expect(module.screenWidth).toBe(Infinity);
// 	window.resizeTo(600, 1200);
// 	expect(module.screenWidth).toBe(768);
// });
