import { StoryFn } from "@storybook/vue3";
import { selectFile } from "@kaciras/utilities/browser";
import { getImageResolution, getVideoResolution } from "../src/media-resolution.ts";

export default {
	title: "HelperFunctions",
};

export const MediaResolution: StoryFn = () => ({
	template: `
		<input v-model="urlInput" placeholder="媒体的URL" style="min-width: 500px">
		<KxButton @click="showImageURLSize">读取URL</KxButton>
		<KxButton @click="showImageFileSize">选择文件...</KxButton>

		<div v-if="error" class="error">错误：{{ error }}</div>

		<template v-else>
			<div v-if="size">
				width: {{ size.width }}, height: {{ size.height }}
			</div>

			<component
				v-if="source"
				:is="mediaType"
				:src="source"
				controls
				alt="preview"
				:style="previewStyle"
			/>
		</template>
	`,
	data: () => ({
		urlInput: "",
		size: null,
		error: null,
		mediaType: null,
		source: null,
	}),
	computed: {
		previewStyle() {
			const { width, height } = this.size || {};
			return {
				display: "block",
				width: width + "px",
				height: height + "px",
			};
		},
	},
	methods: {
		async showImageURLSize() {
			const { urlInput } = this;
			this.error = null;

			try {
				// 先HEAD确定资源类型
				const head = await fetch(urlInput, {
					method: "HEAD",
				});
				await this.parse(head.headers.get("Content-Type"), urlInput);
				this.source = urlInput;
			} catch (e) {
				this.error = e.message || "无法解析图片";
			}
		},

		async showImageFileSize() {
			const [file] = await selectFile("image/*,video/*");
			this.error = null;

			try {
				await this.parse(file.type, file);
				URL.revokeObjectURL(this.source);
				this.source = URL.createObjectURL(file);
			} catch (e) {
				this.error = e.message || "无法解析视频";
			}
		},

		async parse(type: string, source: string) {
			if (type.indexOf("image") === -1) {
				this.size = await getVideoResolution(source);
				this.mediaType = "video";
			} else {
				this.size = await getImageResolution(source);
				this.mediaType = "img";
			}
		},
	},
});
