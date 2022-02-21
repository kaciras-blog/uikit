import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { MediaQueryManager, useBreakPoints, useMQStore } from "../src/media-query";

function createSuite(root: any) {
	const store = createTestingPinia();
	const plugin = new MediaQueryManager();

	return shallowMount(root, {
		global: { plugins: [store, plugin] },
	});
}

it("should available in options API", async () => {
	const app = createSuite({
		template: `
			<div v-if="$mediaQuery.value === 'wide'">WIDE</div>
			<div v-if='$mediaQuery.isBetween("tablet", "desktop")'>TABLET - DESKTOP</div>
		`,
	});

	expect(app.html()).toContain("WIDE");
	expect(app.html()).not.toContain("TABLET - DESKTOP");

	useMQStore().width = 992;
	await nextTick();

	expect(app.html()).not.toContain("WIDE");
	expect(app.html()).toContain("TABLET - DESKTOP");
});

/**
 * 测试提交变更到 Vuex 后是否触发 $mediaMatch 的更新
 */
it("should support composition API", async () => {
	const app = createSuite({
		template: `
			<div v-if="gtWide">WIDE</div>
			<div v-if="between">TABLET - DESKTOP</div>
		`,
		setup() {
			const mq = useBreakPoints();
			const gtWide = mq.greater("wide");
			const between = mq.between("tablet", "desktop");
			return { gtWide, between };
		},
	});

	expect(app.html()).toContain("WIDE");
	expect(app.html()).not.toContain("TABLET - DESKTOP");

	useMQStore().width = 992;
	await nextTick();

	expect(app.html()).not.toContain("WIDE");
	expect(app.html()).toContain("TABLET - DESKTOP");
});

// observeWindow 没法测，因为 JSDOM 不支持 window.matchMedia
