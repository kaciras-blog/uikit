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
			:class="$style.main"
			@mousedown="drag"
			@touchstart.self.prevent="drag"
			@wheel="handleWheel"
		>
			<div :style="wrapStyle" ref="wrapper">
				<img
					:src="image"
					alt="Image to crop"
					:class="$style.image"
					:style="imgStyle"
				>
			</div>
			<div :class="$style.region"></div>
		</div>

		<div :class="$style.toolbar">
			<KxButton
				type="icon"
				title="水平翻转"
				@click="filps.x *= -1"
			>
				<SwapHorizIcon/>
			</KxButton>
			<KxButton
				type="icon"
				title="垂直翻转"
				@click="filps.y *= -1"
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
import KxButton from "../input/KxButton.vue";
import { cursorPosition, observeMouseMove } from "../dragging";

const props = defineProps({
	image: {
		type: String,
		required: true,
	},
	mimeType: {
		type: String,
		required: true,
	},
	aspectRatio: {
		type: Number,
		required: true,
	},
});

const $dialog = useDialog();

const wrapper = shallowRef<HTMLElement>();

const filps = reactive({
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
	transform: `scaleX(${filps.x}) scaleY(${filps.y})`,
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

usePreventScroll();

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
	const { width, height } = wrapper.value!.getBoundingClientRect();

	const d = 1 - deltaY / 100;
	transform.scale *= d;
	transform.x += ((transform.x + width/ 2)  - clientX) * (d - 1);
	transform.y += ((transform.y + height/ 2) - clientY) * (d - 1);
}

function ok() {
	$dialog.confirm(region.value);
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
	position: relative;
	overflow: hidden;
	cursor: move;
}

.image {
	pointer-events: none;
}

.region {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 400px;
	height: 300px;

	pointer-events: none;
	border: solid 1px black;

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
