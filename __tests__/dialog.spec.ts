import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { DialogResult, DialogSession, MessageType } from "../src/dialog/core";
import { default as plugin } from "../src/dialog/quick-alert";
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

function mountContainer() {
	const wrapper = mount(DialogContainer, {
		global: {
			plugins: [plugin],
		},
	});

	const { app } = wrapper.vm.$.appContext;
	const { $dialog } = app.config.globalProperties;
	return { wrapper, $dialog };
}

it("should support clear dialogs", async () => {
	const { wrapper, $dialog } = mountContainer();

	$dialog.show("div", { class: "test" });
	$dialog.show("span", { class: "test" });

	await nextTick();
	expect(wrapper.findAll(".test")).toHaveLength(2);

	$dialog.clear();
	await nextTick();
	expect(wrapper.findAll(".test")).toHaveLength(0);
});

it("should cancel the session when click the cancel button", async () => {
	const { wrapper, $dialog } = mountContainer();

	const session = $dialog.alert({
		cancelable: true,
		title: "Test",
		type: MessageType.Info,
	});
	await nextTick();
	await wrapper.findAll(".btn-group > button")[0].trigger("click");

	await expect(session).resolves.toBe(DialogResult.CANCELED);
});

it("should conform the session when click the accept button", async () => {
	const { wrapper, $dialog } = mountContainer();

	const session = $dialog.alert({
		cancelable: true,
		title: "Test",
		type: MessageType.Info,
	});
	await nextTick();
	await wrapper.findAll(".btn-group > button")[1].trigger("click");

	await expect(session.confirmPromise).resolves.toBeUndefined();
});
