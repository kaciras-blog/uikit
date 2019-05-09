/**
 * 点击后产生
 * 修饰符：
 *   centered - 波纹从元素中心发出，默认是从点击位置发出
 *   circle - 波纹最大宽度不超过元素，默认是要超过的
 */
import { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import { isTouchEvent } from "@/common";
import { RippleEffect } from "@/ripple-effect";


class RippleBinding extends RippleEffect {

	public touched: boolean = false;
	public enabled: boolean = true;
}

interface RippledHtmlElement extends HTMLElement {
	_ripple: RippleBinding;
}

function rippleShow(e: MouseEvent | TouchEvent) {
	const el = e.currentTarget as RippledHtmlElement;

	if (!el || !el._ripple || el._ripple.touched) {
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
	if (!el) return;

	window.setTimeout(() => {
		if (el._ripple) {
			el._ripple.touched = false;
		}
	});
	if (!el || !el._ripple || !el._ripple.enabled) return;
	el._ripple.hide();
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
		const { centered, circle } = binding.modifiers;
		(el as RippledHtmlElement)._ripple = new RippleBinding(el, centered, circle);
		addListeners(el);
	},
	unbind(el: HTMLElement) {
		delete (el as RippledHtmlElement)._ripple;
		removeListeners(el);
	},
	update(el: HTMLElement, binding: DirectiveBinding) {
		if (binding.value === binding.oldValue) {
		}
		console.debug("update");
	},
};
