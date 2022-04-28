import { Story } from "@storybook/vue3";
import { blobToURL, openFile } from "@";
import KxImageCropper from "@/dialog/ImageCropper.vue";

export default {
	component: KxImageCropper,
};

export const ImageCropper: Story = () => ({
	template: `
		<KxButton @click="showCropper"> 裁剪图片</KxButton>
		<DialogContainer/>
		<img v-if="result" :src="result" alt="Cropped image" :style="style">
	`,
	data: () => ({
		result: null,
		style: {},
	}),
	methods: {
		async showCropper() {
			const file = await openFile("image/*");

			const cropper = this.$dialog.show(KxImageCropper, {
				mimeType: file.type,
				aspectRatio: 16 / 9,
				image: await blobToURL(file),
			});
			const i = await cropper.confirmPromise;

			this.style = {
				display: "block",
				marginTop: "20px",
				objectPosition: `${-i.left}px ${-i.top}px`,
				objectFit: "none",
				width: `${i.width}px`,
				height: `${i.height}px`,
			};

			URL.revokeObjectURL(this.result);
			this.result = URL.createObjectURL(file);
		},
	},
});
