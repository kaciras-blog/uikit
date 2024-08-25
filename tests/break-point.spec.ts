import { expect, it, vi } from "vitest";
import { nextTick, ref, watchEffect } from "vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import BreakPoint, { useBreakPoint, useMQStore } from "../src/break-point.ts";

function createSuite(root: any) {
	const store = createTestingPinia({ createSpy: vi.fn });

	return shallowMount(root, {
		global: { plugins: [store, BreakPoint] },
	});
}

it("should available in options API", async () => {
	const app = createSuite({
		template: `
			<div v-if="$bp.value === 'wide'">WIDE</div>
			<div v-if='$bp.isBetween("tablet", "desktop")'>TABLET - DESKTOP</div>
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
			const breakPoint = useBreakPoint();
			const gtWide = breakPoint.greater("wide");
			const between = breakPoint.between("tablet", "desktop");
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

it("should support watch on name", async () => {
	const app = createSuite({
		template: "<div>{{ name }}</div>",
		setup() {
			const breakPoint = useBreakPoint();
			const name = ref("invalid");

			watchEffect(() => {
				name.value = breakPoint.value;
			});

			return { name, breakPoint };
		},
	});

	expect(app.html()).toBe("<div>wide</div>");

	useMQStore().width = 992;
	await nextTick();

	expect(app.html()).toBe("<div>tablet</div>");
});

// observeMediaQuery 没法测，因为 JSDOM 不支持 window.matchMedia
