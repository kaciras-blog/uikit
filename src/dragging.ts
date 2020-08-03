// 俺也来玩玩RxJS
import { Observable, Subscriber } from "rxjs";
import { map, tap } from "rxjs/operators";
import { isTouchEvent } from "./common";

interface Point2D {
	readonly x: number;
	readonly y: number;
}

/**
 * 统一触摸和鼠标事件，返回包含指针位置的对象。
 * 触摸以第一个点击为准。
 *
 * @param event 事件对象
 * @return 包含指针位置的对象
 */
function cursorPosition(event: MouseEvent | TouchEvent) {
	return isTouchEvent(event) ? event.touches[0] : event;
}

/**
 * 监听鼠标的移动，不断产生鼠标的位置，请保证调用该函数时鼠标处于按下状态，或触摸状态，
 * 比如在 mousedown 和 touchstart 事件里调用此函数。
 *
 * @return 不断发出鼠标坐标的Observable
 */
export function observeMouseMove() {
	return new Observable<Point2D>((subscriber) => {

		function onMouseMove(event: MouseEvent) {
			const { clientX, clientY } = event;
			subscriber.next({ x: clientX, y: clientY });
		}

		function onTouchMove(event: TouchEvent) {
			const { clientX, clientY } = event.touches[0];
			subscriber.next({ x: clientX, y: clientY });
		}

		function cleanListeners() {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("touchmove", onTouchMove);
			document.removeEventListener("mouseup", onUp);
			document.removeEventListener("touchend", onUp);
		}

		function onUp(event: Event) {
			event.preventDefault();
			cleanListeners();
			subscriber.complete();
		}

		subscriber.add(cleanListeners);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("touchmove", onTouchMove);
		document.addEventListener("mouseup", onUp);
		document.addEventListener("touchend", onUp);
	});
}

/**
 * 将鼠标位置映射到元素的左上角坐标，相对于窗口。
 *
 * 配合 moveElement 可以实现拖动元素，之所以拆开因为一些框架有自己的dom更新机制，不一定要直接修改元素样式。
 *
 * @param event 鼠标事件
 * @param el 映射的目标元素
 */
export function elementPosition(event: MouseEvent, el: HTMLElement) {
	const clientRect = el.getBoundingClientRect();
	const { clientX, clientY } = cursorPosition(event);

	// 拖动开始时，元素的左上角坐标 - 鼠标的坐标，以后每个鼠标坐标加上该值即为元素左上角坐标。
	// 我就是要用符号来做变量
	const Δx = clientRect.left - clientX;
	const Δy = clientRect.top - clientY;

	return map<Point2D, Point2D>(({ x, y }) => ({ x: x + Δx, y: y + Δy }));
}

/**
 * 将相对于窗口的坐标加上窗口的滚动位置，使其变为相对于文档的坐标。
 */
export function absolute() {
	return map<Point2D, Point2D>(({ x, y }) => ({ x: x + pageXOffset, y: y + pageYOffset }));
}

class InWindowPointFilter extends Subscriber<Point2D> {

	next(point: Point2D) {
		const x = Math.max(0, Math.min(point.x, window.innerWidth));
		const y = Math.max(0, Math.min(point.y, window.innerHeight));
		super._next({ x, y });
	}
}

/**
 * 将坐标点限制在窗口内。
 *
 * 用法：Observable.pipe(limitInWindow)。
 *
 * @param source 原始Observable
 */
export function limitInWindow(source: Observable<Point2D>) {
	return new Observable<Point2D>((subscriber) => source.subscribe(new InWindowPointFilter(subscriber)));
}

class MoveElementPipe extends Subscriber<Point2D> {

	private readonly style: CSSStyleDeclaration;

	constructor(destination: Subscriber<Point2D>, el: HTMLElement) {
		super(destination);

		// 拖动开始时元素的左上角坐标
		const clientRect = el.getBoundingClientRect();
		const originY = clientRect.top;
		const originX = clientRect.left;

		const { style } = el;
		style.position = "absolute";
		style.top = originY + "px";
		style.left = originX + "px";

		this.style = style;
	}

	_next(value: Point2D) {
		this.style.top = value.y + "px";
		this.style.left = value.x + "px";
		super._next(value);
	}
}

/**
 * 将元素设为绝对定位，并根据观察到的点改变元素的 top 和 left.
 *
 * @param el 被移动的元素
 * @return 该函数不改变Observable
 */
export function moveElement(el: HTMLElement) {
	return (source: Observable<Point2D>) => new Observable<Point2D>((subscriber) =>
		source.subscribe(new MoveElementPipe(subscriber, el)));
}

export function edgeScroll(margin: number = 120, speed: number = 0.6) {
	let stopFlag = false;
	let dx = 0, dy = 0;

	function animationLoop() {
		if (stopFlag) {
			return;
		}
		document.scrollingElement!.scrollLeft += dx;
		document.scrollingElement!.scrollTop += dy;
		requestAnimationFrame(animationLoop);
	}

	animationLoop();

	const xMiddle = window.innerWidth / 2;
	const yMiddle = window.innerHeight / 2;

	function calc(pos: number, middle: number) {
		const offset = pos - middle;
		const v = Math.max(0, Math.abs(offset) + margin - middle);
		return speed * v * Math.sign(offset);
	}

	return tap<Point2D>({
		next({ x, y }) {
			dx = calc(x, xMiddle);
			dy = calc(y, yMiddle);
		},
		complete() {
			stopFlag = true;
		},
	});
}
