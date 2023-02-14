import { expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import KxButton from "../../src/input/KxButton.vue";

it("should mixin classnames correctly", async () => {
	const wrapper = mount({
		components: { KxButton },
		template: "<KxButton class='foobar'>Test</KxButton>",
	});

	const classes = wrapper.element.className.split(" ");
	expect(classes.filter(c => c === "foobar")).toHaveLength(1);
});
