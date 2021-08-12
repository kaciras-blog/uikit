import { tap } from "rxjs/operators";
import { ref } from "vue";
import { EdgeScrollObserver, limitInWindow, moveElement, observeMouseMove } from "@/dragging";

export default {
	title: "Dragging",
};

export const Demo = (args) => ({
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

		const style = () => ({ "--edge-size": args.size + "px" });

		function drag(event) {
			const { size, speed } = args;
			const el = event.target;

			const eso = new EdgeScrollObserver(size, speed);

			el.style.cursor = "grabbing";

			observeMouseMove().pipe(limitInWindow(), tap(eso), moveElement(event, el)).subscribe({
				next: () => {
					vX.value = eso.vX.toFixed(1);
					vY.value = eso.vY.toFixed(1);
				},
				complete: () => el.style.cursor = null,
			});
		}

		return { vX, vY, style, drag };
	},
});

Demo.args = {
	size: 80,
	speed: 0.4,
};
