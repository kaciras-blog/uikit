<!--
	【不支持响应式】
	如果改变窗口大小裁剪框并不会跟着适应，因为要实现该功能很复杂，
	特别是支持裁剪框可调的情况下。
-->
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
			>
				<div v-if="circle" :class="$style.circle"/>
				<template v-else>
					<div :class="$style.dash"/>
					<div :class="$style.dash"/>
				</template>

				<PlusIcon :class="$style.crosshair"/>
			</div>
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
import PlusIcon from "bootstrap-icons/icons/plus-lg.svg?sfc";
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

const loadStatus = shallowRef<boolean | null>(false);
const main = shallowRef<HTMLElement>();
const regionEl = shallowRef<HTMLElement>();

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
	const { x, y, width, height } = stencil;
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

export interface CropResult {
	left: number;
	top: number;
	width: number;
	height: number;

	rotate: number;

	flipX: boolean;
	flipY: boolean;
}

function ok() {
	$dialog.confirm({
		...region.value,
		rotate: transform.rotate,
		flipX: flip.x === -1,
		flipY: flip.y === -1,
	});
}

/**
 * 确定裁剪框的位置和图片的初始缩放。
 */
function resetLayout(img: HTMLImageElement) {
	const { width: vw, height: vh } = main.value!.getBoundingClientRect();
	const { aspectRatio } = props;
	const rw = (vh * aspectRatio) / vw;
	const rh = (vw / aspectRatio) / vh;

	if (rw < rh) {
		stencil.width = rw * vw;
		stencil.height = stencil.width / aspectRatio;
	} else {
		stencil.height = rh * vh;
		stencil.width = stencil.height * aspectRatio;
	}
	stencil.x = (vw - stencil.width) / 2;
	stencil.y = (vh - stencil.height) / 2;

	transform.x = 0;
	transform.y = 0;

	let { naturalWidth: w, naturalHeight: h } = img;
	if (transform.rotate % 180 !== 0) {
		[w, h] = [h, w];
	}
	transform.scale = Math.max(vw / w, vh / h);
}

function handleLoad(event: Event) {
	loadStatus.value = true;
	resetLayout(event.target as HTMLImageElement);
}

/**
 * 在固定宽高比模式下，选择操作可能使图片超出裁剪框，故要重置视图。
 */
watch(() => transform.rotate, () => {
	resetLayout(main.value!.firstElementChild!.firstElementChild as HTMLImageElement);
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

/**
 * 检查并调整图片的偏移，保裁剪区在图片内，不会裁剪出空白。
 */
function fixTransform() {
	const { width: nw, height: nh } = getNaturalDimension();
	const { vw, vh } = getContainerSize();

	const left = vw / 2 - nw * transform.scale / 2 + transform.x;
	const top = vh / 2 - nh * transform.scale / 2 + transform.y;
	const right = left + nw * transform.scale;
	const bottom = top + nh * transform.scale;

	if (left > stencil.x) {
		transform.x -= left - stencil.x;
	} else if (right < stencil.x + stencil.width) {
		transform.x += stencil.x + stencil.width - right;
	}

	if (top > stencil.y) {
		transform.y -= top - stencil.y;
	} else if (bottom < stencil.y + stencil.height) {
		transform.y += stencil.y + stencil.height - bottom;
	}
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
	user-select: none;

	background-image:
			linear-gradient(45deg, @tile-color 25%, transparent 0),
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
	border: solid 1px #eee;
	pointer-events: none;
	overflow: hidden;

	/* 用阴影实现元素外变暗 */
	box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.3);
}

.dash {
	position: absolute;
	border: 0 dashed #eee;

	&:nth-child(1) {
		height: calc(100% / 3);
		left: 0;
		top: calc(100% / 3);
		width: 100%;

		border-bottom-width: 1px;
		border-top-width: 1px;
	}

	&:nth-child(2) {
		left: calc(100% / 3);
		top: 0;
		width: calc(100% / 3);
		height: 100%;

		border-left-width: 1px;
		border-right-width: 1px;
	}
}

.circle {
	border-radius: 100%;
	width: 100%;
	height: 100%;

	border: solid 1px #eee;
	box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.3);
}

.crosshair {
	position: absolute;
	top: calc(50% - 10px);
	left: calc(50% - 10px);
	color: #eee;
	font-size: 20px;
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
