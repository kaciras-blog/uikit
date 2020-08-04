// 俺也来玩玩RxJS
import { Observable } from "rxjs";
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
 * 将坐标点限制在窗口内。
 */
export function limitInWindow() {
	return map<Point2D, Point2D>(({ x, y }) => ({
		x: Math.max(0, Math.min(x, window.innerWidth)),
		y: Math.max(0, Math.min(y, window.innerHeight)),
	}));
}

/**
 * 将元素设为绝对定位，并根据观察到的点改变元素的 top 和 left.
 *
 * @param event 鼠标事件
 * @param el 被移动的元素
 */
export function moveElement(event: MouseEvent, el: HTMLElement) {
	const { clientX, clientY } = cursorPosition(event);
	const { style } = el;
	const clientRect = el.getBoundingClientRect();

	// 拖动开始时，元素的左上角坐标 - 鼠标的坐标，以后每个鼠标坐标加上该值即为元素左上角坐标。
	// 我就是要用符号来做变量
	const Δx = clientRect.left - clientX;
	const Δy = clientRect.top - clientY;

	// 设置 Fixed 定位及坐标
	style.position = "fixed";
	style.top = clientRect.top + "px";
	style.left = clientRect.left + "px";

	return tap<Point2D>(({ x, y }) => {
		style.top = y + Δy + "px";
		style.left = x + Δx + "px";
	});
}

/**
 * 实例化时会启动动画循环，不断给滚动条的位置加上 dx 和 dy。
 * 这两个变量表示两个方向上的滚动速度，默认为0，当鼠标进入边缘区域时它们被设置为非0值。
 *
 * 拖动结束后清除动画帧回调，停止循环。
 */
class EdgeScrollObserver {

	private readonly size: number;
	private readonly speed: number;

	private dx = 0;
	private dy = 0

	private animationFrame: number;

	constructor(size: number, speed: number) {
		this.size = size;
		this.speed = speed;
		this.loop = this.loop.bind(this);
		this.animationFrame = requestAnimationFrame(this.loop);
	}

	next({ x, y }: Point2D) {
		this.dx = this.calc(x, window.innerWidth / 2);
		this.dy = this.calc(y, window.innerHeight / 2);
	}

	complete() {
		cancelAnimationFrame(this.animationFrame);
	}

	private loop() {
		const { scrollingElement } = document;
		const { dx, dy, loop } = this;

		scrollingElement!.scrollLeft += dx;
		scrollingElement!.scrollTop += dy;

		this.animationFrame = requestAnimationFrame(loop);
	}

	private calc(pos: number, middle: number) {
		const { size, speed } = this;

		const offset = pos - middle;
		const v = Math.max(0, Math.abs(offset) + size - middle);
		return speed * v * Math.sign(offset);
	}
}

/**
 * 当鼠标靠近屏幕的边缘时自动向外滚动，越靠近边缘速度越快。
 *
 * 可以用于在超出屏幕范围的容器内拖动时，自动调整可视区位置。
 *
 * @param size 触发宽度，离边缘距离小于该值时开始滚动
 * @param speed 速度，值越大滚动得越快
 */
export function edgeScroll(size: number = 100, speed: number = 0.4) {
	return tap<Point2D>(new EdgeScrollObserver(size, speed));
}
