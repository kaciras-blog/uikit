import { blobToURL, openFile } from "@";
import KxImageCropper from "@/dialog/KxImageCropper";

export default {
	component: KxImageCropper,
};

export const Simple = () => ({
	template: `
		<kx-button icon="fa fa-upload" @click="showCropper"> 裁剪图片</kx-button>
		<kx-dialog-container/>
		<img v-if="result" :src="result" alt="Cropped image">
	`,
	data: () => ({
		result: null,
	}),
	methods: {
		async showCropper() {
			const file = await openFile("image/*");

			const cropper = this.$dialog.cropImage({
				image: await blobToURL(file),
				type: file.type,
				aspectRatio: 10 / 9,
			});
			const blob = await cropper.confirmPromise;

			URL.revokeObjectURL(this.result);
			this.result = URL.createObjectURL(blob);
		},
	},
});
