import { StoryFn } from "@storybook/vue3";
import { computed, ref } from "vue";
import { EdgeScrollObserver, limitInWindow, moveElement, startDragging } from "../src/dragging.ts";

export default {
	title: "Dragging",
	args: {
		size: 80,
		speed: 0.4,
	},
	argTypes: {
		size: {
			control: {
				type: "number",
				step: 1,
			},
		},
		speed: {
			control: {
				type: "number",
				step: 0.1,
			},
		},
	},
};

export const Dragging: StoryFn = (args) => ({
	template: `
		<div id="drag-demo" :style="style">
			<aside id="drag-demo-labels">
				<div>横向速度：{{ vX }}</div>
				<div>纵向速度：{{ vY }}</div>
			</aside>
			<div id="drag-demo-el" @pointerdown="drag">拖动试试</div>
		</div>
	`,
	setup() {
		const vX = ref("0.0");
		const vY = ref("0.0");

		const style = computed(() => ({
			"--edge-size": args.size + "px",
		}));

		function drag(event: PointerEvent) {
			const { size, speed } = args;
			const el = event.target as HTMLElement;

			const edgeScroll = new EdgeScrollObserver(document.scrollingElement, size, speed);
			el.style.cursor = "grabbing";

			startDragging(event, [
				limitInWindow,
				moveElement(event, el),
				edgeScroll,
				{
					onEnd() {
						el.style.cursor = "";
					},
					onMove() {
						vX.value = edgeScroll.vX.toFixed(1);
						vY.value = edgeScroll.vY.toFixed(1);
					},
				},
			]);
		}

		return { vX, vY, style, drag };
	},
});
