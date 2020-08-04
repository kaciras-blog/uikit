import { storiesOf } from "@storybook/vue";
import { number, withKnobs } from "@storybook/addon-knobs";
import { EdgeScrollObserver, limitInWindow, moveElement, observeMouseMove } from "@/dragging";
import { tap } from "rxjs/operators";

const stories = storiesOf("Dragging", module);
stories.addDecorator(withKnobs);

stories.add("Demo", () => ({
	props: {
		size: {
			default: number("Size", 80, { step: 10 }),
		},
		speed: {
			default: number("Speed", 0.4, { step: 0.1 }),
		},
	},
	template: `
		<div id="drag-demo" :style="style">
			<aside id="drag-demo-labels">
				<div>横向速度：{{ vX }}</div>
				<div>纵向速度：{{ vY }}</div>
			</aside>
			<div id="drag-demo-el" @mousedown="drag" @touchstart.prevent="drag">拖动示例</div>
		</div>
	`,
	data: () => ({
		vX: "0.0",
		vY: "0.0",
	}),
	computed: {
		style() {
			return { "--edge-size": this.size + "px" };
		},
	},
	methods: {
		drag(event) {
			const { size, speed } = this;
			const el = event.target;

			const eso = new EdgeScrollObserver(size, speed);

			el.style.cursor = "grabbing";

			observeMouseMove().pipe(limitInWindow(), tap(eso), moveElement(event, el)).subscribe({
				next: () => {
					this.vX = eso.vX.toFixed(1);
					this.vY = eso.vY.toFixed(1);
				},
				complete: () => el.style.cursor = null,
			});
		},
	},
}));
