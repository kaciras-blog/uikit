interface Point2D {
	x: number;
	y: number;
}

type OnMove = (event: Point2D) => void;

interface DragHandlers {
	onMove: OnMove;

	onEnd?(event: Event): void;
}

/**
 * 监听鼠标的移动，不断产生鼠标的位置，请保证调用该函数时鼠标处于按下状态或触摸状态，
 * 比如在 pointerdown 事件里调用此函数。
 */
export function startDragging(init: PointerEvent, handlers: OnMove | DragHandlers) {
	if (init.button !== 0) {
		return;
	}
	if (typeof handlers === "function") {
		handlers = { onMove: handlers };
	}

	// 傻逼艹的 TypeScript 对 let 变量和参数不做 Narrow。
	const typeCasted = handlers;

	// Avoid dragging selected contents.
	init.preventDefault();

	function handleMove(event: PointerEvent) {
		typeCasted.onMove(event);
	}

	/*
	 * It's better to attach handlers to `document` over `window`, as the
	 * user can use window events to ensure runs after the drag handler.
	 */
	function handleEnd(event: Event) {
		typeCasted.onEnd?.(event);
		event.preventDefault();
		document.removeEventListener("pointerup", handleEnd);
		document.removeEventListener("pointermove", handleMove);
	}

	document.addEventListener("pointerup", handleEnd);
	document.addEventListener("pointermove", handleMove);
}

/**
 * 将坐标点限制在窗口内。
 */
export function limitInWindow(point: Point2D) {
	point.x = Math.max(0, Math.min(point.x, window.innerWidth));
	point.y = Math.max(0, Math.min(point.y, window.innerHeight));
}

/**
 * 将元素设为 fixed 定位，并根据观察到的点改变元素的 top 和 left 实现拖动效果。
 *
 * @param event 鼠标事件
 * @param el 被移动的元素
 */
export function moveElement(event: MouseEvent, el: HTMLElement) {
	const { x, y } = event;
	const { style } = el;
	const clientRect = el.getBoundingClientRect();

	// 拖动开始时，元素的左上角坐标 - 鼠标的坐标，以后每个鼠标坐标加上该值即为元素左上角坐标。
	const Δx = clientRect.left - x;
	const Δy = clientRect.top - y;

	// 设置 fixed 定位及初始坐标
	style.position = "fixed";
	style.top = clientRect.top + "px";
	style.left = clientRect.left + "px";

	return ({ x, y }: Point2D) => {
		style.top = y + Δy + "px";
		style.left = x + Δx + "px";
	};
}

/**
 * 当鼠标靠近屏幕的边缘时自动向外滚动，越靠近边缘速度越快。
 * 可以用于在超出屏幕范围的容器内拖动时，自动调整可视区位置。
 *
 * 【实现原理】
 * 实例化时会启动动画循环（requireAnimationFrame），不断给滚动条的位置加上 vX 和 vY。
 * 这两个变量表示两个方向上的滚动速度，默认为0，当鼠标进入边缘区域时它们被设置为非0值。
 *
 * 拖动结束后清除动画帧回调，停止循环。
 */
export class EdgeScrollObserver {

	private readonly margin: number;
	private readonly speed: number;

	// 为了方便直接 public 了，但是不要再外部修改它们
	vX = 0;
	vY = 0;

	private animationFrame: number;

	/**
	 * 创建 EdgeScrollObserver 的实例，并启动循环。
	 *
	 * @param margin 触发宽度，离边缘距离小于该值时开始滚动
	 * @param speed 速度因子，值越大滚动得越快
	 */
	constructor(margin = 80, speed = 0.4) {
		this.margin = margin;
		this.speed = speed;
		this.loop = this.loop.bind(this);
		this.animationFrame = requestAnimationFrame(this.loop);
	}

	onMove({ x, y }: Point2D) {
		this.vX = this.calc(x, window.innerWidth / 2);
		this.vY = this.calc(y, window.innerHeight / 2);
	}

	onEnd() {
		cancelAnimationFrame(this.animationFrame);
	}

	private loop() {
		const { scrollingElement } = document;
		const { vX, vY, loop } = this;

		scrollingElement!.scrollLeft += vX;
		scrollingElement!.scrollTop += vY;

		this.animationFrame = requestAnimationFrame(loop);
	}

	private calc(pos: number, middle: number) {
		const { margin, speed } = this;

		const offset = pos - middle;
		const v = Math.max(0, Math.abs(offset) + margin - middle);
		return speed * v * Math.sign(offset);
	}
}

