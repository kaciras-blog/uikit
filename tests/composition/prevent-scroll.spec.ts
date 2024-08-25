import { expect, it } from "vitest";
import { h } from "vue";
import { usePreventScroll } from "../../src/composition/index.ts";
import { mount } from "@vue/test-utils";

const ScrollLock = {
	render: () => h("div"),
	setup() {
		usePreventScroll();
	},
};

it("should be reentrant", async () => {
	const wrapper = mount({
		components: { ScrollLock },
		template: "<ScrollLock v-if='a'/><ScrollLock v-if='b'/>",
		data: () => ({ a: false, b: false }),
	});

	await wrapper.setData({ a: true, b: false });
	await wrapper.setData({ a: true, b: true });

	expect(document.body.style.overflow).toBe("hidden");

	await wrapper.setData({ a: false, b: true });
	await wrapper.setData({ a: false, b: false });

	expect(document.body.style.overflow).toBe("");
});
