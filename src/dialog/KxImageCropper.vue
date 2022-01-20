<template>
	<div :class="$style.container">
		<header :class="$style.header">
			<h1>裁剪图片</h1>
			<kx-button
				title="关闭"
				:class="$style.close_button"
				@click="$dialog.close"
			>
				<close-icon/>
			</kx-button>
		</header>

		<div :class="$style.image">
			<img
				ref="imageEl"
				style="display: none"
				:src="image"
				alt="Image to crop"
			>
		</div>

		<div :class="$style.toolbar">
			<kx-button
				title="水平翻转"
				@click="cropper.scaleX(xScale = -xScale)"
			>
				<swap-horiz-icon/>
			</kx-button>
			<kx-button
				title="垂直翻转"
				@click="cropper.scaleY(yScale = -yScale)"
			>
				<swap-vert-icon/>
			</kx-button>
			<kx-button
				icon="fa fa-redo-alt"
				title="旋转"
				@click="cropper.rotate(90)"
			>
				<rotate-right-icon/>
			</kx-button>
			<kx-button
				title="100%"
				@click="cropper.zoomTo(1)"
			>
				<zoom-out-map/>
			</kx-button>

			<div :class="$style.stats">
				{{ cropX }} - {{ cropY }} |
				{{ cropWidth }} x {{ cropHeight }}
			</div>

			<div :class="$style.right_buttons">
				<kx-button @click="$dialog.close">取消</kx-button>
				<kx-button class="primary" @click="ok">确定</kx-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import "cropperjs/dist/cropper.min.css";
import Cropper from "cropperjs";
import { usePreventScroll } from "../scroll";
import CloseIcon from "../assets/icon-close.svg";
import SwapHorizIcon from "../assets/swap_horiz.svg";
import SwapVertIcon from "../assets/swap_vert.svg";
import RotateRightIcon from "../assets/rotate_right.svg";
import ZoomOutMap from "../assets/zoom_out_map.svg";
import { useDialog } from "./quick-alert";

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

const emit = defineEmits(["confirm"]);

const $dialog = useDialog();

// cropper.scaleX() 始终相对于原图
const xScale = ref(1);
const yScale = ref(1);

const cropX = ref("0");
const cropY = ref("0");
const cropWidth = ref("0");
const cropHeight = ref("0");

const imageEl = ref<HTMLImageElement>();
const cropper = ref<Cropper>();

usePreventScroll();

function ok() {
	const canvas = cropper.value!.getCroppedCanvas({
		// maxWidth: this.width,
		// maxHeight: this.height,
	});
	canvas.toBlob(rv => emit("confirm", rv), props.mimeType);
}

onMounted(() => {
	cropper.value = new Cropper(imageEl.value, {
		aspectRatio: props.aspectRatio,
		viewMode: 2,
		dragMode: "move",
		crop: (event) => {
			cropX.value = event.detail.x.toFixed(0);
			cropY.value = event.detail.y.toFixed(0);
			cropWidth.value = event.detail.width.toFixed(0);
			cropHeight.value = event.detail.height.toFixed(0);
		},
	});
});
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

.image {
	flex: 1;
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
