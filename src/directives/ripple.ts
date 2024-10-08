/**
 * 使绑定的元素点击后产生波纹效果。
 * 修饰符：
 *   centered - 波纹从元素中心发出，默认是从点击位置发出
 *   circle - 波纹最大宽度不超过元素，默认是要超过的
 */
import { DirectiveBinding } from "vue";
import { isTouchEvent } from "../common.ts";
import { RippleEffect } from "../ripple-effect.ts";

class RippleBinding extends RippleEffect {
	touched = false;
	enabled = true;
}

interface RippledHtmlElement extends HTMLElement {
	_ripple?: RippleBinding;
}

function rippleShow(e: MouseEvent | TouchEvent) {
	const el = e.currentTarget as RippledHtmlElement | null;

	if (!el?._ripple || el._ripple.touched) {
		return;
	}
	if (isTouchEvent(e)) {
		el._ripple.touched = true;
	}
	const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
	el._ripple.show(target.clientX, target.clientY);
}

function rippleHide(e: MouseEvent | TouchEvent) {
	const el = e.currentTarget as RippledHtmlElement | null;
	if (!el) {
		return;
	}
	const { _ripple } = el;

	window.setTimeout(() => {
		if (_ripple) {
			_ripple.touched = false;
		}
	});
	if (_ripple?.enabled) _ripple.hide();
}

/**
 * passive 参数告诉浏览器回调内不会调用 preventDefault 改变默认行为，从而使浏览器跳过对其的等待而直接
 * 应用默认行为，在一些性能关键的场景下有用。在使用了 passive 参数的回调中调用 preventDefault 不产生任何效果。
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
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		const { centered, circle } = binding.modifiers;
		(el as RippledHtmlElement)._ripple = new RippleBinding(el, centered, circle);
		addListeners(el);
	},
	unmounted(el: HTMLElement) {
		delete (el as RippledHtmlElement)._ripple;
		removeListeners(el);
	},
	// 不支持更新绑定符
	// update(el: HTMLElement, binding: DirectiveBinding) {
	// 	if (binding.value === binding.oldValue) {
	// 		return;
	// 	}
	// 	const ripple = (el as RippledHtmlElement)._ripple;
	// 	const { centered, circle } = binding.modifiers;
	// 	ripple.circle = circle;
	// 	ripple.centered = centered;
	// },
};
