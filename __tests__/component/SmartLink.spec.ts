import { createRouter, createWebHistory } from "vue-router";
import { shallowMount } from "@vue/test-utils";
import SmartLink from "../../src/components/SmartLink.vue";

it("should render <a> on full url", async () => {
	const href = "http://example.com/foo/bar";
	const router = createRouter({
		routes: [],
		history: createWebHistory(),
	});

	const wrapper = shallowMount(SmartLink, {
		props: { href },
		global: { plugins: [router] },
	});

	expect(wrapper.find("a").attributes("href")).toBe(href);
});

it("should render router-view on path", async () => {
	const wrapper = shallowMount(SmartLink, {
		props: { href: "/foo/bar" },
	});
	expect(wrapper.find("router-view")).toBeDefined();
});
