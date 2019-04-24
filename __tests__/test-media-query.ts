import { MediaQueryPlugin, observeWindow, registerToStore, SET_SCREEN_WIDTH } from "../src/media-query";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";

// TODO： 怎么搞一下类型系统
interface MediaQueryExt extends Vue {
	$mediaMatch(exp: string): boolean;
}

function createVueSuite() {
	const localVue = createLocalVue();
	localVue.use(Vuex);
	localVue.use(MediaQueryPlugin);
	const store = new Vuex.Store({});
	registerToStore(store);
	return { localVue, store };
}

test("$mediaMatch", () => {
	const suite = createVueSuite();
	const wrapper = shallowMount<MediaQueryExt>({
		render(h) {
			return h("div");
		},
	}, suite);

	expect(wrapper.vm.$mediaMatch("wide")).toBe(true);
	expect(wrapper.vm.$mediaMatch("desktop")).toBe(false);
});

/**
 * 测试提交变更到 Vuex 后是否触发 $mediaMatch 的更新
 */
test("responsive $mediaMatch", () => {
	const template = `
		<div v-if="$mediaMatch('desktop+')">DESKTOP</div>
		<div v-else-if="$mediaMatch('mobile')">TABLET</div>`;

	const suite = createVueSuite();
	const wrapper = shallowMount<MediaQueryExt>({ template }, suite);

	expect(wrapper.html()).toContain("DESKTOP");
	expect(wrapper.html()).not.toContain("TABLET");

	suite.store.commit(SET_SCREEN_WIDTH, 768);
	expect(wrapper.html()).toContain("TABLET");
});

// TODO: mock mediaQuery ?
test("observeWindow", () => {
	const { store } = createVueSuite();
	observeWindow(store);
	const module = (store.state as any).mediaQuery;

	expect(module.screenWidth).toBe(Infinity);
	window.resizeTo(600, 1200);
	expect(module.screenWidth).toBe(768);
});
