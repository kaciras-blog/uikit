<template>
	<div :class="$style.container">
		<header :class="$style.header">
			<h1 class="compact">
				裁剪图片
			</h1>
			<KxButton
				type="icon"
				title="关闭"
				:class="$style.close_button"
				@click="$dialog.close"
			>
				<CloseIcon/>
			</KxButton>
		</header>

		<div
			v-show="loadStatus"
			ref="main"
			:class="$style.cropView"
			@mousedown="drag"
			@touchstart.self.prevent="drag"
			@wheel="handleWheel"
		>
			<div :style="wrapStyle">
				<img
					:src="image"
					alt="Image to crop"
					:class="$style.image"
					:style="imgStyle"
					@load="handleLoad"
					@error="loadStatus = null"
				>
			</div>
			<div
				ref="regionEl"
				:class="$style.region"
				:style="stencilStyle"
			/>
		</div>

		<!--
			要放在后面，以便在未加载时覆盖 main 引用。
		-->
		<div
			v-if="loadStatus === false"
			ref="main"
			:class="$style.loading"
		>
			<AtomSpinner/>
			加载中...
		</div>
		<div
			v-else-if="loadStatus === null"
			:class="$style.loading"
		>
			加载失败，请重新选择图片以重试。
		</div>

		<div :class="$style.toolbar">
			<KxButton
				type="icon"
				title="水平翻转"
				@click="flip.x *= -1"
			>
				<SwapHorizIcon/>
			</KxButton>
			<KxButton
				type="icon"
				title="垂直翻转"
				@click="flip.y *= -1"
			>
				<SwapVertIcon/>
			</KxButton>
			<KxButton
				type="icon"
				title="旋转"
				@click="transform.rotate += 90"
			>
				<RotateRightIcon/>
			</KxButton>
			<KxButton
				type="icon"
				title="100%"
				@click="transform.scale = 1"
			>
				<ZoomOutMap/>
			</KxButton>

			<input
				type="number"
				title="缩放"
				min="0.01"
				step="0.1"
				:value="transform.scale.toPrecision(3)"
				@input="e => transform.scale = e.target.valueAsNumber"
			>

			<div :class="$style.stats">
				{{ region.left }} - {{ region.top }} |
				{{ region.width }} x {{ region.height }}
			</div>

			<div :class="$style.right_buttons">
				<KxButton
					color="second"
					@click="$dialog.close"
				>
					取消
				</KxButton>
				<KxButton @click="ok">确定</KxButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from "vue";
import { usePreventScroll } from "../composition";
import CloseIcon from "../assets/icon-close.svg?sfc";
import SwapHorizIcon from "../assets/swap_horiz.svg?sfc";
import SwapVertIcon from "../assets/swap_vert.svg?sfc";
import RotateRightIcon from "../assets/rotate_right.svg?sfc";
import ZoomOutMap from "../assets/zoom_out_map.svg?sfc";
import { useDialog } from "./quick-alert";
import { cursorPosition, observeMouseMove } from "../dragging";
import KxButton from "../input/KxButton.vue";
import AtomSpinner from "../components/AtomSpinner.vue";

const props = defineProps({
	/**
	 * 要裁剪的图片的 URL。
	 */
	image: {
		type: String,
		required: true,
	},
	/**
	 * 是否使用圆形裁剪框。
	 */
	circle: {
		type: Boolean,
		default: false,
	},
	/**
	 * 目标宽高比，比如 1 或 16 / 9。
	 */
	aspectRatio: {
		type: Number,
		required: true,
	},
});


const $dialog = useDialog();
usePreventScroll();

const main = shallowRef<HTMLElement>();
const regionEl = shallowRef<HTMLElement>();

const loadStatus = shallowRef<boolean | null>(false);

const stencil = reactive({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});

const flip = reactive({
	x: 1,
	y: 1,
});

const transform = reactive({
	x: 0,
	y: 0,
	rotate: 0,
	scale: 1,
});

const imgStyle = computed(() => ({
	transform: `scaleX(${flip.x}) scaleY(${flip.y})`,
}));

const wrapStyle = computed(() => {
	const { x, y, rotate, scale } = transform;
	return {
		lineHeight: 0,
		transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
	};
});

const stencilStyle = computed(() => {
	const { x, y, width, height } = stencil!;
	return {
		top: `${y}px`,
		left: `${x}px`,
		width: `${width}px`,
		height: `${height}px`,
	};
});

function getContainerSize() {
	if (!main.value) {
		return { vw: 0, vh: 0 };
	}
	const rect = main.value.getBoundingClientRect();
	return { vw: rect.width, vh: rect.height };
}

function invert(value: number) {
	return Math.floor(value / transform.scale);
}

const region = computed(() => {
	stencil.x;
	transform.x;

	if (!main.value) {
		return { top: 0, left: 0, width: 0, height: 0 };
	}
	const ri = main.value.firstElementChild!.getBoundingClientRect();
	const rs = main.value.lastElementChild!.getBoundingClientRect();

	return {
		width: invert(stencil.width),
		height: invert(stencil.height),
		left: invert(rs.left - ri.left),
		top: invert(rs.top - ri.top),
	};
});

function layout(img: HTMLImageElement) {
	let { naturalWidth: w, naturalHeight: h } = img;
	const { width: vw, height: vh } = main.value!.getBoundingClientRect();

	if (transform.rotate % 180 !== 0) {
		[w, h] = [h, w];
	}

	const rw = (vh * props.aspectRatio) / vw;
	const rh = (vw / props.aspectRatio) / vh;

	let width;
	let height;

	if (rw < rh) {
		width = rw * vw;
		height = width / props.aspectRatio;
	} else {
		height = rh * vh;
		width = height * props.aspectRatio;
	}

	stencil.width = width;
	stencil.height = height;
	stencil.x = (vw - width) / 2;
	stencil.y = (vh - height) / 2;

	transform.x = 0;
	transform.y = 0;
	transform.scale = Math.max(vw / w, vh / h);
}

function handleLoad(event: Event) {
	layout(event.target as HTMLImageElement);
	loadStatus.value = true;
}

watch(() => transform.rotate, () => {
	layout(main.value!.firstElementChild!.firstElementChild as HTMLImageElement);
});

/**
 * 获取图片在未缩放时的尺寸，考虑了旋转等操作，该函数只能在图片加载后调用。
 */
function getNaturalDimension() {
	const img = main.value!.firstElementChild!.firstElementChild;
	let { naturalWidth, naturalHeight } = img as HTMLImageElement;

	if (transform.rotate % 180 !== 0) {
		[naturalWidth, naturalHeight] = [naturalHeight, naturalWidth];
	}
	return { width: naturalWidth, height: naturalHeight };
}

function ok() {
	$dialog.confirm({
		...region.value,
		rotate: transform.rotate,
		flipH: flip.x === -1,
		flipV: flip.y === -1,
	});
}

function drag(event: MouseEvent | TouchEvent) {
	const { clientX, clientY } = cursorPosition(event);

	const Δx = transform.x - clientX;
	const Δy = transform.y - clientY;

	observeMouseMove().subscribe(({ x, y }) => {
		transform.x = Δx + x;
		transform.y = Δy + y;
		fixTransform();
	});
}

function fixTransform() {
	const { width: nw, height: nh } = getNaturalDimension();
	const { vw, vh } = getContainerSize();

	const px = vw / 2 - nw * transform.scale / 2 + transform.x;
	const py = vh / 2 - nh * transform.scale / 2 + transform.y;

	if (px > stencil.x) {
		transform.x -= px - stencil.x;
	} else if (px + nw * transform.scale < stencil.x + stencil.width) {
		transform.x += stencil.x + stencil.width - (px + nw * transform.scale);
	}

	if (py > stencil.y) {
		transform.y -= py - stencil.y;
	} else if (py + nh * transform.scale < stencil.y + stencil.height) {
		transform.y += stencil.y + stencil.height - (py + nh * transform.scale);
	}
}

function handleWheel(event: WheelEvent) {
	const { deltaY, clientX, clientY } = event;
	event.preventDefault();

	// 计算缩放后的偏移位置，注意 transform: scale(...) 以中心为基准。
	const imgBox = event.currentTarget as HTMLElement;
	const rect = imgBox.firstElementChild!.getBoundingClientRect();

	const { width: nw, height: nh } = getNaturalDimension();

	// 确保图片的每个轴都不小于裁剪区。
	let d = 1 - deltaY / 1500;
	d = Math.max(stencil.width / nw / transform.scale, d);
	d = Math.max(stencil.height / nh / transform.scale, d);

	transform.scale *= d;
	transform.x -= (clientX - rect.left - rect.width / 2) * (d - 1);
	transform.y -= (clientY - rect.top - rect.height / 2) * (d - 1);
	fixTransform();
}
</script>

<style module lang="less">
.container {
	composes: full-vertex from global;

	position: fixed;
	z-index: 1000;

	display: flex;
	flex-direction: column;
	background: white;
}

.header {
	display: flex;
	align-items: flex-start;
	margin: 10px;
}

.close_button {
	margin-left: auto;
	font-size: 2rem;
}

.main {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
}

.cropView {
	@tile-color: #eee;
	composes: main;

	cursor: move;
	position: relative;
	overflow: hidden;

	background-image: linear-gradient(45deg, @tile-color 25%, transparent 0),
	linear-gradient(45deg, transparent 75%, @tile-color 0),
	linear-gradient(45deg, @tile-color 25%, transparent 0),
	linear-gradient(45deg, transparent 75%, @tile-color 0);
	background-size: 20px 20px;
	background-position: 0 0, 10px 10px, 10px 10px, 0 0;
}

.loading {
	composes: main;

	flex-direction: column;
	gap: 10px;
	font-size: 1.5em;
}

.image {
	pointer-events: none;
}

.region {
	position: absolute;
	border: solid 1px white;
	pointer-events: none;

	/* 用阴影实现元素外变暗 */
	box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.3);
}

.toolbar {
	margin: 10px;
	display: flex;
	align-items: center;
}

.stats {
	padding: 0 10px;
	font-size: initial;
}

.right_buttons {
	composes: btn-group from global;
	margin-left: auto;
}
</style>
