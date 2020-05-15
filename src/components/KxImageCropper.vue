<template>
	<div :class="$style.container">
		<header :class="$style.header">
			<h1>裁剪图片</h1>
			<kx-button
				title="关闭"
				:class="$style.close_button"
				icon="fa fa-times"
				@click="$dialog.close"
			/>
		</header>

		<div :class="$style.image">
			<img
				ref="image"
				style="display: none"
				:src="image"
				alt="Image to crop"
			>
		</div>

		<div :class="$style.toolbar">
			<kx-button
				icon="fa fa-arrows-alt-h"
				title="水平翻转"
				@click="cropper.scaleX(xScale = -xScale)"
			/>
			<kx-button
				icon="fa fa-arrows-alt-v"
				title="垂直翻转"
				@click="cropper.scaleY(yScale = -yScale)"
			/>
			<kx-button
				icon="fa fa-redo-alt"
				title="旋转"
				@click="cropper.rotate(90)"
			/>
			<kx-button
				icon="fa fa-expand"
				title="100%"
				@click="cropper.zoomTo(1)"
			/>
			<div :class="$style.right_buttons">
				<kx-button @click="$dialog.close">取消</kx-button>
				<kx-button class="primary" @click="ok">确定</kx-button>
			</div>
		</div>
	</div>
</template>

<script>
import "cropperjs/dist/cropper.min.css";
import Cropper from "cropperjs";

export default {
	name: "KxImageCropper",
	props: {
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
	},
	data: () => ({
		// cropper.scaleX() 始终相对于原图
		xScale: 1,
		yScale: 1,
		cropper: undefined,
	}),
	methods: {
		ok() {
			const canvas = this.cropper.getCroppedCanvas({
				maxWidth: this.width,
				maxHeight: this.height,
			});
			canvas.toBlob(this.$dialog.confirm, this.mimeType);
		},
	},
	mounted() {
		const { aspectRatio, $refs } = this;
		this.cropper = new Cropper($refs.image, {
			aspectRatio,
			viewMode: 2,
			dragMode: "move",
		});
	},
};
</script>

<style module lang="less">
@import "../css/index";

.container {
	position: fixed;
	.full-vertex;

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
}

.right_buttons {
	composes: btn-group from global;
	margin-left: auto;
}
</style>
