<template>
	<div :class="$style.container">
		<header :class="$style.header">
			<h1>裁剪图片</h1>
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
			:class="$style.cropView"
			@mousedown="drag"
			@touchstart.self.prevent="drag"
			@wheel="handleWheel"
		>
			<div :style="wrapStyle" ref="main">
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
				v-model="transform.scale"
			>

			<div :class="$style.stats">
				{{ region.left }} - {{ region.top }} |
				{{ region.width }} x {{ region.height }}
			</div>

			<div :class="$style.right_buttons">
				<KxButton @click="$dialog.close">取消</KxButton>
				<KxButton class="primary" @click="ok">确定</KxButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, shallowRef } from "vue";
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
const loadStatus = shallowRef<boolean | null>(false);
const stencilStyle = shallowRef();

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
	return { transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})` };
});

const region = computed(() => {
	return {
		left: 0,
		top: 0,
		width: 1,
		height: 1,
	};
});

function handleLoad(event: Event) {
	const { width: w, height: h } = (event.target as HTMLImageElement);
	const { width: vw, height: vh } = main.value!.getBoundingClientRect();

	transform.scale = Math.max(vw / w, vh / h);
	loadStatus.value = true;

	const s = Math.min(vw / (1/ props.aspectRatio), vh / props.aspectRatio);
	stencilStyle.value = {
		top: `calc(50% - ${vw * s / 2}px)`,
		left: `calc(50% - ${vh * s / 2}px)`,
		width: `${vw * s}px`,
		height: `${vh * s}px`,
	};
}

function ok() {
	$dialog.confirm({
		...region.value,
		scale: transform.scale,
		flipHorizontal: flip.x === -1,
		flipVertically: flip.y === -1,
	});
}

function drag(event: MouseEvent | TouchEvent) {
	const { clientX, clientY } = cursorPosition(event);

	const Δx = transform.x - clientX;
	const Δy = transform.y - clientY;

	observeMouseMove().subscribe(({ x, y }) => {
		transform.x = Δx + x;
		transform.y = Δy + y;
	});
}

function handleWheel(event: WheelEvent) {
	const { deltaY, clientX, clientY } = event;
	event.preventDefault();

	const d = 1 - deltaY / 100;
	transform.scale *= d;

	const { width, height } = main.value!.getBoundingClientRect();
	transform.x += ((transform.x + width / 2) - clientX) * (d - 1);
	transform.y += ((transform.y + height / 2) - clientY) * (d - 1);
}
</script>

<style module lang="less">
.container {
	composes: full-vertex from global;

	position: fixed;
	z-index: 1000;

	display: flex;
	flex-direction: column;
	padding: 20px 40px;
	background: white;
}

.header {
	display: flex;
	align-items: flex-start;
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
	composes: main;

	cursor: move;
	position: relative;
	overflow: hidden;
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
	margin-top: 20px;
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
