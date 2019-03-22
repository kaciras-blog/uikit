import { NextObserver, Observable, Subscriber } from "rxjs";

interface Point2D {
	x: number;
	y: number;
}

/**
 * 请保证调用该函数时鼠标处于按下状态
 */
export function listenDragging() {
	return new Observable<Point2D>(subscriber => {

		function onMove(event: MouseEvent | TouchEvent) {
			event.preventDefault();
			const touches = (event as TouchEvent).touches;
			const { clientX, clientY } = touches && touches.length > 0 ? touches[0] : (event as MouseEvent);
			subscriber.next({ x: clientX, y: clientY });
		}

		function cleanListeners() {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("touchmove", onMove);
			document.removeEventListener("mouseup", onUp);
			document.removeEventListener("touchend", onUp);
		}

		function onUp(event: Event) {
			event.preventDefault();
			cleanListeners();
			subscriber.complete();
		}

		subscriber.add(cleanListeners);
		document.addEventListener("mousemove", onMove);
		document.addEventListener("touchmove", onMove);
		document.addEventListener("mouseup", onUp);
		document.addEventListener("touchend", onUp);
	});
}

class InWindowPointLimiter implements NextObserver<Point2D> {

	private readonly destination: Subscriber<Point2D>;

	constructor(destination: Subscriber<Point2D>) {
		this.destination = destination;
	}

	public next(point: Point2D) {
		if (point.x < 0 || point.x > window.innerWidth)
			return;
		if (point.y < 0 || point.y > window.innerHeight)
			return;
		this.destination.next(point);
	}
}

/**
 * 过滤掉超出浏览器窗口的点。
 * 用法：Observable.pipe(limitInWindow)。
 *
 * @param source 原始Observable
 */
export function limitInWindow(source: Observable<Point2D>) {
	return new Observable<Point2D>(subscriber => source.subscribe(new InWindowPointLimiter(subscriber)));
}


class MoveElementPipe implements NextObserver<Point2D> {

	private readonly style: CSSStyleDeclaration;

	// 元素顶点相对于鼠标位置的偏移 = 元素位置 - 鼠标位置
	private readonly mouseOffsetX: number;
	private readonly mouseOffsetY: number;

	private readonly destination: Subscriber<Point2D>;

	constructor(destination: Subscriber<Point2D>, event: MouseEvent, el: HTMLElement) {
		this.destination = destination;
		const clientRect = el.getBoundingClientRect();

		// 拖动开始时元素的左上角坐标
		const originX = clientRect.left;
		const originY = clientRect.top;

		const { style } = el;
		style.position = "absolute";
		style.top = originY + "px";
		style.left = originX + "px";

		this.style = style;
		this.mouseOffsetX = originX - event.clientX;
		this.mouseOffsetY = originY - event.clientY;
	}

	// 新的坐标 = 元素开始位置 + (鼠标当前位置 - 鼠标开始位置)
	public next(value: Point2D) {
		const elementX = this.mouseOffsetX + value.x;
		const elementY = this.mouseOffsetY + value.y;
		this.style.top = elementY + "px";
		this.style.left = elementX + "px";
		this.destination.next({ x: elementX, y: elementY });
	}
}

/**
 * 开始拖动HTML元素，被拖动的元素可以与被点击元素不同。
 *
 * @param event 拖动开始的那一下点击事件
 * @param el 被拖动的元素
 * @return 新的Observable，每个点将转换为元素的顶点
 */
export function moveElement(event: MouseEvent, el: HTMLElement) {
	return (source: Observable<Point2D>) => new Observable<Point2D>(subscriber => source.subscribe(new MoveElementPipe(subscriber, event, el)));
}
