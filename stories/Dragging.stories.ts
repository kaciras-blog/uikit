import { StoryFn } from "@storybook/vue3";
import { computed, ref } from "vue";
import { EdgeScrollObserver, limitInWindow, moveElement, startDragging } from "../src/dragging.js";

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

export const Demo: StoryFn = (args) => ({
	template: `
		<div id="drag-demo" :style="style">
			<aside id="drag-demo-labels">
				<div>横向速度：{{ vX }}</div>
				<div>纵向速度：{{ vY }}</div>
			</aside>
			<div id="drag-demo-el" @mousedown="drag" @touchstart.prevent="drag">拖动示例</div>
		</div>
	`,
	setup() {
		const vX = ref("0.0");
		const vY = ref("0.0");

		const style = computed(() => ({ "--edge-size": args.size + "px" }));

		function drag(event: MouseEvent) {
			const { size, speed } = args;
			const el = event.target as HTMLElement;

			const edgeScroller = new EdgeScrollObserver(size, speed);
			const move = moveElement(event, el);
			el.style.cursor = "grabbing";

			startDragging(event, {
				onMove(point) {
					limitInWindow(point);
					move(point);
					vX.value = edgeScroller.vX.toFixed(1);
					vY.value = edgeScroller.vY.toFixed(1);
				},
				onEnd(event: Event) {
					el.style.cursor = "";
					edgeScroller.onEnd(event);
				},
			});
		}

		return { vX, vY, style, drag };
	},
});
