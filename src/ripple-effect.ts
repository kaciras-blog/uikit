/* 波浪效果，主要参考了Vuetify */

function transform(el: HTMLElement, value: string) {
	el.style["transform"] = value;
	el.style["webkitTransform"] = value;
}

export class RippleEffect {

	public centered: boolean;
	public circle: boolean;

	private readonly el: HTMLElement;

	constructor(el: HTMLElement, centered: boolean, circle: boolean) {
		this.el = el;
		this.centered = centered;
		this.circle = circle;
	}

	public show(clientX: number, clientY: number) {
		const { el } = this;
		const { radius, scale, x, y, centerX, centerY } = this.calculate(clientX, clientY, el);

		const container = document.createElement("span");
		const animation = document.createElement("span");
		container.appendChild(animation);

		container.className = "v-ripple__container";
		animation.className = "v-ripple__animation";

		const size = `${radius * 2}px`;
		animation.style.width = size;
		animation.style.height = size;

		el.appendChild(container);

		const computed = window.getComputedStyle(el);
		if (computed && computed.position === "static") {
			el.style.position = "relative";
			el.dataset.previousPosition = "static";
		}

		animation.classList.add("v-ripple__animation--enter");
		animation.classList.add("v-ripple__animation--visible");

		transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
		animation.style.opacity = "0";
		animation.dataset.activated = String(performance.now());

		setTimeout(() => {
			animation.classList.remove("v-ripple__animation--enter");
			animation.classList.add("v-ripple__animation--in");
			animation.style.opacity = "0.1";
			transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
		});
	}

	public hide() {
		const { el } = this;
		const ripples = el.getElementsByClassName("v-ripple__animation");

		if (ripples.length === 0) return;
		const animation = ripples[ripples.length - 1] as HTMLElement;

		if (animation.dataset.isHiding) return;
		else animation.dataset.isHiding = "true";

		const diff = performance.now() - Number(animation.dataset.activated);
		const delay = Math.max(250 - diff, 0);

		setTimeout(() => {
			animation.classList.remove("v-ripple__animation--in");
			animation.classList.add("v-ripple__animation--out");
			animation.style.opacity = "0";

			setTimeout(() => {
				const ripples = el.getElementsByClassName("v-ripple__animation");
				if (ripples.length === 1 && el.dataset.previousPosition) {
					el.style.position = el.dataset.previousPosition;
					delete el.dataset.previousPosition;
				}
				animation.parentNode && el.removeChild(animation.parentNode);
			}, 300);
		}, delay);
	}

	private calculate(clientX: number, clientY: number, el: HTMLElement) {
		const offset = el.getBoundingClientRect();
		const localX = clientX - offset.left;
		const localY = clientY - offset.top;

		let radius = 0;
		let scale = 0.3;

		if (this.circle) {
			scale = 0.15;
			radius = el.clientWidth / 2;
			radius = this.centered ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
		} else {
			radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
		}

		const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`;
		const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`;

		const x = this.centered ? centerX : `${localX - radius}px`;
		const y = this.centered ? centerY : `${localY - radius}px`;

		/*
		 * radius 波浪圆形的结束半径
		 * scale 波浪圆形的初始半径比例
		 */
		return { radius, scale, x, y, centerX, centerY };
	}
}
