import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import { DialogResult, DialogSession, QuickDialogController } from "../src/dialog/core";
import DialogContainer from "../src/dialog/DialogContainer.vue";

describe("DialogSession", () => {

	it("shouldn't resolve confirmPromise on cancelled", async () => {
		const s = new DialogSession(Promise.resolve(DialogResult.CANCELED));
		const conform = s.confirmPromise.then(() => 11);
		const timeout = new Promise(resolve => setTimeout(resolve, 50, 22));

		expect(await Promise.race([conform, timeout])).toBe(22);
	});

	it("should resolve confirmPromise with confirm", async () => {
		const sess = new DialogSession(Promise.resolve(DialogResult.confirm(555)));
		await sess.confirmPromise.then((value) => expect(value).toBe(555));
	});
});

it("should support clear dialogs", async () => {
	const $dialog = new QuickDialogController();
	const wrapper = shallowMount(DialogContainer, {
		global: {
			provide: { $dialog },
		},
	});

	$dialog.show("div", { class: "test" });
	$dialog.show("span", { class: "test" });

	await nextTick();
	expect(wrapper.findAll(".test")).toHaveLength(2);

	$dialog.clear();
	await nextTick();
	expect(wrapper.findAll(".test")).toHaveLength(0);
});
