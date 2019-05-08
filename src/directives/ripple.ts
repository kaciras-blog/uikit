/**
 * 点击后产生波浪效果，参考了Vuetify。
 * 修饰符：
 *   centered - 波纹从元素中心发出，默认是从点击位置发出
 *   circle - 波纹最大宽度不超过元素，默认是要超过的
 */
import { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

function transform(el: HTMLElement, value: string) {
	el.style["transform"] = value;
	el.style["webkitTransform"] = value;
}

function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
	return e.constructor.name === "TouchEvent";
}

function calculate(e: MouseEvent | TouchEvent, el: HTMLElement) {
	const offset = el.getBoundingClientRect();
	const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
	const localX = target.clientX - offset.left;
	const localY = target.clientY - offset.top;

	let radius = 0;
	let scale = 0.3;
	// if (el._ripple && el._ripple.circle) {
	// 	scale = 0.15;
	// 	radius = el.clientWidth / 2;
	// 	radius = radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
	// } else {
		radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
	// }

	const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`;
	const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`;

	const x = `${localX - radius}px`;
	const y = `${localY - radius}px`;

	/*
	 * radius 波浪圆形的结束半径
	 * scale 波浪圆形的初始半径比例
	 */
	return { radius, scale, x, y, centerX, centerY };
}

function rippleShow(e: MouseEvent | TouchEvent) {
	const el = e.currentTarget as HTMLElement;

	// if (!el || !el._ripple || el._ripple.touched) {
	// 	return;
	// }
	// if (isTouchEvent(e)) {
	// 	el._ripple.touched = true;
	// }

	const container = document.createElement("span");
	const animation = document.createElement("span");
	container.appendChild(animation);

	container.className = "v-ripple__container";
	animation.className = "v-ripple__animation";

	const { radius, scale, x, y, centerX, centerY } = calculate(e, el);

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
		transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
		animation.style.opacity = "0.25";
	}, 0);
}

function rippleHide(e: Event) {
	const el = e.currentTarget as HTMLElement | null;
	if (!el) return;

	// window.setTimeout(() => {
	// 	if (el._ripple) {
	// 		el._ripple.touched = false;
	// 	}
	// });

	// _ripple.hide

	// if (!el || !el._ripple || !el._ripple.enabled) return;

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

/**
 * passive 参数告诉浏览器回调内不会调用 preventDefault 改变默认行为，从而使浏览器跳过对其的等待而直接应用默认行为，
 * 在一些性能关键的场景下有用。在使用了 passive 参数的回调中调用 preventDefault 不产生任何效果。
 *
 * @param el HTML元素
 */
function addListeners(el: HTMLElement) {
	el.addEventListener("touchstart", rippleShow, { passive: true });
	el.addEventListener("touchend", rippleHide, { passive: true });
	el.addEventListener("touchcancel", rippleHide);

	el.addEventListener("mousedown", rippleShow);
	el.addEventListener("mouseup", rippleHide);
	el.addEventListener("mouseleave", rippleHide);
	el.addEventListener("dragstart", rippleHide, { passive: true });
}

function removeListeners(el: HTMLElement) {
	el.removeEventListener("touchstart", rippleHide);
	el.removeEventListener("touchend", rippleHide);
	el.removeEventListener("touchcancel", rippleHide);
	el.removeEventListener("mousedown", rippleShow);
	el.removeEventListener("mouseup", rippleHide);
	el.removeEventListener("mouseleave", rippleHide);
	el.removeEventListener("dragstart", rippleHide);
}

export default {
	bind(el: HTMLElement, binding: DirectiveBinding, node: VNode) {
		addListeners(el);
	},
	unbind(el: HTMLElement) {
		delete el._ripple;
		removeListeners(el);
	},
	update(el: HTMLElement, binding: DirectiveBinding) {
		if (binding.value === binding.oldValue) {

		}

	},
};
