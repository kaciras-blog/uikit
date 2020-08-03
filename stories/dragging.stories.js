import { storiesOf } from "@storybook/vue";
import { number, withKnobs } from "@storybook/addon-knobs";
import { absolute, edgeScroll, elementPosition, moveElement, observeMouseMove } from "@/dragging";

const stories = storiesOf("Dragging", module);
stories.addDecorator(withKnobs);

stories.add("Demo", () => ({
	props: {
		size: {
			default: number("Size", 100, { step: 10 }),
		},
		speed: {
			default: number("Speed", 0.5, { step: 0.1 }),
		},
	},
	template: `
		<div id="drag-demo" :style="style">
		<div id="drag-demo-el" @mousedown="drag"></div>
		</div>
	`,
	computed: {
		style() {
			return { "--edge-size": this.size + "px" };
		},
	},
	methods: {
		drag(event) {
			const { size, speed } = this;
			const el = event.target;

			el.style.cursor = "grabbing";

			observeMouseMove(event)
				.pipe(edgeScroll(size, speed), elementPosition(event, el), absolute(), moveElement(el))
				.subscribe({ complete: () => el.style.cursor = null });
		},
	},
}));
